import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import {
  createChat,
  getChats,
  getLatestChats,
  searchChats
} from '@/core/api/chats'
import moment from 'moment'
import { MessageEntities } from '../messages'

export interface ChatEntities {
  [key: number]: ChatMessage
}
export interface ChatMessage extends Chat {
  messageEntities?: MessageEntities
}
export interface ChatsState {
  newChatTitle: string
  selectedChatId: number
  chatEntites: ChatEntities
  isSearching: boolean
  query: string
  searchedChats: Partial<Chat>[]
}

export default {
  namespaced: true,
  state: {
    chatEntites: {},
    selectedChatId: null,
    newChatTitle: '',
    query: '',
    isSearching: false,
    searchedChats: []
  },
  actions: {
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
    selectChat(
      { commit, dispatch }: ActionContext<ChatsState, AppState>,
      payload: number
    ): void {
      commit('setSelectedChatId', payload)
      dispatch('messages/loadChatMessages', null, { root: true })
    },
    async getChats({
      commit
    }: ActionContext<ChatsState, AppState>): Promise<void> {
      const { data } = await getChats()
      const chatEntites = (data as Chat[]).reduce(
        (entity, chat) => ({ ...entity, [chat.id]: { ...chat } }),
        {}
      )
      commit('setChatEntities', chatEntites)
    },
    async getLatestChats(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: number
    ): Promise<void> {
      const { data } = await getLatestChats(payload)
      const chatEntites = (data as Chat[]).reduce(
        (entity, chat) => ({ ...entity, [chat.id]: { ...chat } }),
        {}
      )
      commit('setChatEntities', chatEntites)
    },
    async setChatEntities(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: ChatEntities
    ): Promise<void> {
      commit('setChatEntities', payload)
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
      const { data } = await searchChats(payload, username)
      if (data.length) {
        result = result.concat([
          {
            title: 'Trò chuyện',
            isHeading: true,
            id: 'conversation'
          } as Partial<Chat>,
          ...data
        ])
      }
      commit('setSearchedChats', result)
      commit('setIsSearching', false)
    },
    offSearchChats({ commit }: ActionContext<ChatsState, AppState>) {
      commit('setQuery', '')
      commit('setSearchedChats', [])
    },
    setSelectedMessageEntities(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: MessageEntities
    ) {
      commit('setSelectedMessageEntities', payload)
    }
  },
  mutations: {
    setSelectedChatId(state: ChatsState, payload: number): void {
      state.selectedChatId = payload
    },
    setNewChatTitle(state: ChatsState, payload: string): void {
      state.newChatTitle = payload
    },
    setChatEntities(state: ChatsState, payload: ChatEntities): void {
      state.chatEntites = payload
    },
    setSearchedChats(state: ChatsState, payload: Partial<Chat>[]) {
      state.searchedChats = payload
    },
    setQuery(state: ChatsState, payload: string) {
      state.query = payload
    },
    setIsSearching(state: ChatsState, payload: boolean) {
      state.isSearching = payload
    },
    setSelectedMessageEntities(state: ChatsState, payload: MessageEntities) {
      state.chatEntites[state.selectedChatId].messageEntities = payload
    }
  },
  getters: {
    selectedChatId(state: ChatsState): number {
      return state.selectedChatId
    },
    selectedMessageEntities(
      state: ChatsState,
      { selectedChatId }
    ): MessageEntities | undefined | null {
      return selectedChatId
        ? state.chatEntites[selectedChatId].messageEntities
        : null
    },
    newChatTitle(state: ChatsState): string {
      return state.newChatTitle
    },
    hasSelectedChat(state, { selectedChatId }): boolean {
      return !!selectedChatId
    },
    chatEntities({ chatEntites }: ChatsState) {
      return chatEntites
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
      return Object.values(chatEntities as ChatEntities).sort(
        (a: Chat, b: Chat) => {
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
        }
      )
    }
  }
}
