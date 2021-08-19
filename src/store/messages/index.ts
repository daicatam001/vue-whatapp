import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Message } from '@/core/models/messages'
import { getLatestMessage } from '@/core/api/messages'

const CHAT_COUNT = 25

export interface MessagesState {
  isLoading: boolean
  currentChatCount: number
  messages: Message[]
}

export default {
  namespaced: true,
  state: {
    isLoading: false,
    currentChatCount: CHAT_COUNT,
    messages: []
  },
  actions: {
    async fetchLatestMessages({
      commit,
      dispatch
    }: ActionContext<MessagesState, AppState>): Promise<void> {
      commit('setCurrentChatCount', CHAT_COUNT)
      await dispatch('fetchMessages')
    },
    async fetchMessages({
      commit,
      getters,
      rootGetters
    }: ActionContext<MessagesState, AppState>): Promise<void> {
      commit('setIsLoading', true)
      try {
        const chatId = rootGetters['chats/selectedChatId']
        const chatCount = getters.currentChatCount
        const { data } = await getLatestMessage(chatId, chatCount)
        commit('setMessages', data)
      } catch (e) {
        // ..
      }
      commit('setIsLoading', false)
    }
  },
  mutations: {
    setIsLoading(state: MessagesState, payload: boolean): void {
      state.isLoading = payload
    },
    setCurrentChatCount(state: MessagesState, payload: number): void {
      state.currentChatCount = payload
    },
    setMessages(state: MessagesState, payload: Message[]): void {
      state.messages = payload
    }
  },

  getters: {
    messages(state: MessagesState): Message[] {
      return state.messages
    },
    isLoading(state: MessagesState): boolean {
      return state.isLoading
    },
    currentChatCount(state: MessagesState): number {
      return state.currentChatCount
    }
  }
}
