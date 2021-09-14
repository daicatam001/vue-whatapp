import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import {
  addChatMember,
  createChat,
  getChats,
  getLatestChats,
  readMessage,
  searchChats
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
  selectedChatId: number
  newChatUser: UserInfo
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
    },
    // async getChats({
    //   commit
    // }: ActionContext<ChatsState, AppState>): Promise<void> {
    //   const { data } = await getChats()
    //   const chatEntities = (data as Chat[]).reduce((entity, chat) => {
    //     chat = formatChat(chat)
    //     return { ...entity, [chat.id]: { ...chat, messageEntities: {} } }
    //   }, {})

    //   commit('setChatEntities', chatEntities)
    // },
    // async getLatestChats(
    //   { commit }: ActionContext<ChatsState, AppState>,
    //   payload: number
    // ): Promise<void> {
    //   const { data } = await getLatestChats(payload)
    //   const chatEntities = (data as Chat[]).reduce((entity, chat) => {
    //     chat = formatChat(chat)
    //     return {
    //       ...entity,
    //       [chat.id]: { ...chat, messageEntities: {} }
    //     }
    //   }, {})
    //   commit('setChatEntities', chatEntities)
    // },
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
      commit('setIsSearching', true)
      const username = rootGetters['auth/username']
      let result = [] as Partial<Chat>[]
      const [convoRes, userRes] = await Promise.all([
        searchChats(payload, username),
        getUsers()
      ])
      // const convoRes = await searchChats(payload, username)
      if (convoRes.data.length) {
        result = result.concat([
          {
            title: i18n.global.t('conversation'),
            type: CHAT_CARD_TYPE.HEADING,
            id: 'conversation'
          } as Partial<Chat>,
          ...convoRes.data.map(item => formatChat(item))
        ])
      }
      if (userRes.data.length) {
        const users = userRes.data.map(item => ({
          id: item.id,
          avatar: item.avatar,
          username: item.username,
          first_name: item.first_name,
          custom_json: item.custom_json
            ? JSON.parse(item.custom_json as string)
            : {},
          type: CHAT_CARD_TYPE.PHONE_BOOK
        }))
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
    offSearchChats({ commit }: ActionContext<ChatsState, AppState>) {
      commit('setQuery', '')
      commit('setSearchedChats', [])
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
    selectedChatId(state: ChatsState): number {
      return state.selectedChatId
    },
    newChatUser(state: ChatsState): UserInfo {
      return state.newChatUser
    },
    selectedChat(state: ChatsState, { selectedChatId }): Chat {
      return (
        state.chatEntities[selectedChatId] || {
          people: []
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
        .filter((item: Chat) => !!item.last_message.created)
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
