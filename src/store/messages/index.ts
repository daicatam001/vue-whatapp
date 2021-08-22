import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Message, MessageCreate } from '@/core/models/messages'
import { getLatestMessage, sendMessage } from '@/core/api/messages'

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
    async sendMessage(
      { getters }: ActionContext<MessagesState, AppState>,
      message: MessageCreate
    ): Promise<void> {
      const chatId = getters.chatId
      await sendMessage(chatId, message)
    },
    async fetchLatestMessages({
      commit,
      dispatch
    }: ActionContext<MessagesState, AppState>): Promise<void> {
      commit('setCurrentChatCount', CHAT_COUNT)
      await dispatch('fetchMessages')
    },
    async fetchMessages({
      commit,
      getters
    }: ActionContext<MessagesState, AppState>): Promise<void> {
      commit('setIsLoading', true)
      try {
        const chatId = getters.chatId
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
    chatId(
      state: MessagesState,
      getters: any,
      rootState: AppState,
      rootGetters: any
    ): string {
      return rootGetters['chats/selectedChatId']
    },
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
