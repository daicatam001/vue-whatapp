import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import {
  addChatMember,
  createChat,
  deleteChat,
  getChats,
  readMessage
} from '@/core/api/chats'
import moment from 'moment'
import { MessageEntities } from '../messages'
import { Message } from '@/core/models/messages'
import i18n from '@/core/i18n'
import { getUsers } from '@/core/api/users'
import { CHAT_CARD_TYPE } from '@/core/constants'
import { UserInfo } from '@/core/models/users'
import { formatChat } from '@/core/helpers'

export interface ChatEntities {
  [key: number]: ChatMessage
}
export interface ChatMessage extends Chat {
  messageEntities: MessageEntities
}
export interface ChatsState {
  newChatTitle: string
  selectedChatId?: number | null
  newChatUser: UserInfo | null
  chatEntities: ChatEntities
  isSearching: boolean
  query: string
  searchedChats: Partial<Chat>[]
}

export default {
  namespaced: true,
  state: {
    chatEntities: {},
    selectedChatId: null,
    newChatUser: null,
    newChatTitle: '',
    query: '',
    isSearching: false,
    searchedChats: []
  },
  actions: {
    async reset({ commit }: ActionContext<ChatsState, AppState>) {
      commit('reset')
      // commit('setNewChatUser', null)
    },
    async createNewChatUser(
      { commit, rootGetters }: ActionContext<ChatsState, AppState>,
      payload: UserInfo
    ) {
      const username = rootGetters['auth/username']
      const { data } = await createChat(`${username}_to_${payload.username}`)
      commit('setSelectedChatId', data.id)
      await addChatMember(data.id as number, payload.username)
      // commit('setNewChatUser', null)
    },
    onInput(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: string
    ): void {
      commit('setNewChatTitle', payload)
    },
    async createNewChat({
      state,
      commit
    }: ActionContext<ChatsState, AppState>): Promise<void> {
      if (!state.newChatTitle) {
        return
      }
      try {
        await createChat(state.newChatTitle)
        commit('setNewChatTitle', '')
      } catch (e) {
        // ..
      }
    },
    setNewChatUser(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: UserInfo
    ) {
      commit('setNewChatUser', payload)
    },
    selectChat(
      { commit, dispatch, getters }: ActionContext<ChatsState, AppState>,
      payload: number
    ): void {
      const chat = getters.chatEntities[payload] as Chat
      readMessage(payload, chat.last_message.id)
      commit('setSelectedChatId', payload)
      dispatch('messages/loadChatMessages', null, { root: true })
      setTimeout(() => {
        dispatch('ui/focusMessageInput', null, { root: true })
      })
    },
    async setChatEntities(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: ChatEntities
    ): Promise<void> {
      commit('setChatEntities', payload)
    },
    async updateChat(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: Chat
    ): Promise<void> {
      commit('updateChat', payload)
    },
    async searchChats(
      { commit, rootGetters }: ActionContext<ChatsState, AppState>,
      payload: string
    ): Promise<void> {
      commit('setQuery', payload)
      if (!payload) {
        commit('setSearchedChats', [])
        return
      }
      const query = payload.toLowerCase()
      commit('setIsSearching', true)
      const username = rootGetters['auth/username']
      let result = [] as Partial<Chat>[]
      const [chatRes, userRes] = await Promise.all([getChats(), getUsers()])
      // filter conversation
      const convos = chatRes.data.filter((chat: Chat) => {
        if (!chat.last_message.created) {
          return false
        }
        if (!chat.is_direct_chat && chat.title.toLowerCase().includes(query)) {
          return true
        }
        const members = chat.people.filter(p => p.person.username != username)
        if (
          members.find(
            p =>
              (p.person.first_name &&
                p.person.first_name.toLowerCase().includes(query)) ||
              (p.person.email && p.person.email.toLowerCase().includes(query))
          )
        ) {
          return true
        }
      })

      if (convos.length) {
        result = result.concat([
          {
            title: i18n.global.t('conversation'),
            type: CHAT_CARD_TYPE.HEADING,
            id: 'conversation'
          } as Partial<Chat>,
          ...convos.map(item => formatChat(item))
        ])
      }
      // filter user
      const users = userRes.data
        .filter((user: UserInfo) => {
          if (
            chatRes.data.find(
              chat =>
                chat.last_message.sender &&
                chat.is_direct_chat &&
                chat.title.includes(user.username)
            )
          ) {
            return false
          }
          if (
            user.first_name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query)
          ) {
            return true
          }
        })
        .map(item => ({
          id: item.id,
          avatar: item.avatar,
          username: item.username,
          first_name: item.first_name,
          custom_json: item.custom_json
            ? JSON.parse(item.custom_json as string)
            : {},
          type: CHAT_CARD_TYPE.PHONE_BOOK
        }))

      if (users.length) {
        result = result.concat([
          {
            title: i18n.global.t('phoneBook'),
            type: CHAT_CARD_TYPE.HEADING,
            id: 'phoneBook'
          } as Partial<Chat>,
          ...users
        ])
      }
      commit('setSearchedChats', result)
      commit('setIsSearching', false)
    },
    offSearchChats({ commit, getters }: ActionContext<ChatsState, AppState>) {
      commit('setQuery', '')
      commit('setSearchedChats', [])
      // const chatEntities = getters.chatEntities
      // const emptyChats = Object.values(chatEntities).filter(
      //   chat => !(chat as Chat).last_message.sender_username
      // )
      // Promise.all(
      //   emptyChats.map(chat => deleteChat((chat as Chat).id as number))
      // )
    },
    setMessageEntities(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: { chatId: number; messageEntities: MessageEntities }
    ) {
      commit('updateChat', {
        id: payload.chatId,
        messageEntities: { ...payload.messageEntities }
      })
    },
    addMessage(
      { commit, getters }: ActionContext<ChatsState, AppState>,
      { chatId, message }: { chatId: number; message: Message }
    ) {
      if (!getters.chatEntities[chatId]) {
        return null
      }
      const last_message = { ...message }
      const messageEntities = {
        ...getters.chatEntities[chatId].messageEntities,
        [message.custom_json.sending_time]: { ...message }
      }
      commit('updateChat', {
        id: chatId,
        last_message,
        messageEntities
      })
    },
    updateMessage(
      { commit, getters }: ActionContext<ChatsState, AppState>,
      { chatId, message }: { chatId: number; message: Message }
    ) {
      const dataUpdate = { id: chatId } as ChatMessage
      console.log(getters.chatEntities, chatId)
      dataUpdate.messageEntities = {
        ...getters.chatEntities[chatId].messageEntities,
        [message.custom_json.sending_time]: { ...message }
      }
      if (getters.chatEntities[chatId].last_message.id === message.id) {
        dataUpdate.last_message = { ...message }
      }
      commit('updateChat', dataUpdate)
    },
    setLastMessage(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: { chatId: number; message: Message }
    ) {
      commit('updateChat', {
        id: payload.chatId,
        last_message: payload.message
      })
    }
  },
  mutations: {
    reset(state: ChatsState): void {
      state = {
        chatEntities: {},
        selectedChatId: undefined,
        newChatUser: null,
        newChatTitle: '',
        query: '',
        isSearching: false,
        searchedChats: []
      }
    },
    setNewChatUser(state: ChatsState, payload: UserInfo): void {
      state.newChatUser = payload
    },
    setSelectedChatId(state: ChatsState, payload: number): void {
      state.selectedChatId = payload
    },
    setNewChatTitle(state: ChatsState, payload: string): void {
      state.newChatTitle = payload
    },
    setChatEntities(state: ChatsState, payload: ChatEntities): void {
      state.chatEntities = payload
    },
    updateChat(state: ChatsState, payload: Chat): void {
      state.chatEntities[payload.id] = {
        ...state.chatEntities[payload.id],
        ...payload
      }
      if (state.selectedChatId && !state.chatEntities[state.selectedChatId]) {
        state.selectedChatId = null
      }
    },
    setSearchedChats(state: ChatsState, payload: Partial<Chat>[]) {
      state.searchedChats = [...payload]
    },
    setQuery(state: ChatsState, payload: string) {
      state.query = payload
    },
    setIsSearching(state: ChatsState, payload: boolean) {
      state.isSearching = payload
    }
  },
  getters: {
    selectedChatId(state: ChatsState): number | null | undefined {
      return state.selectedChatId
    },
    newChatUser(state: ChatsState): UserInfo | null {
      return state.newChatUser
    },
    selectedChat(state: ChatsState, { selectedChatId }): Chat {
      return (
        state.chatEntities[selectedChatId] || {
          people: [],
          last_message: {},
          custom_json: {},
          messageEntities: {},
          admin: {}
        }
      )
    },
    selectedMessageEntities(
      state: ChatsState,
      { selectedChat }
    ): MessageEntities | undefined | null {
      return selectedChat ? selectedChat.messageEntities : null
    },
    newChatTitle(state: ChatsState): string {
      return state.newChatTitle
    },
    hasSelectedChat(state, { selectedChatId, newChatUser }): boolean {
      return !!selectedChatId || !!newChatUser
    },
    chatEntities({ chatEntities }: ChatsState) {
      return chatEntities
    },
    searchedChats({ searchedChats }: ChatsState) {
      return searchedChats
    },
    isSearching({ isSearching }: ChatsState) {
      return isSearching
    },
    query({ query }: ChatsState) {
      return query
    },
    noSearchResult(state, { query, searchedChats }) {
      return !!query && !searchedChats.length
    },
    chats(state: ChatsState, { searchedChats, chatEntities }): Chat[] {
      if (searchedChats.length) {
        return searchedChats
      }
      return Object.values(chatEntities as ChatEntities)
      .filter((item: Chat) => !!item.last_message.sender_username)
        .sort((a: Chat, b: Chat) => {
          const lastMessageA = moment(
            a.last_message ? a.last_message.created : a.created
          )
          const lastMessageB = moment(
            b.last_message ? b.last_message.created : b.created
          )
          if (lastMessageA.isAfter(lastMessageB)) {
            return -1
          }
          if (lastMessageA.isBefore(lastMessageB)) {
            return 1
          }
          return 0
        })
    }
  }
}
