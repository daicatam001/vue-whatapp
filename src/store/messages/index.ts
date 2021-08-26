import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Message, MessageCreate } from '@/core/models/messages'
import { getLatestMessage, sendMessage } from '@/core/api/messages'
import { LOAD_STATE } from '@/core/constants'
import moment from 'moment'

const CHAT_COUNT = 25

export interface MessageEntities {
  [key: number]: Message
}
export interface MessageChatEntites {
  [key: number]: MessageEntities
}
export interface MessagesState {
  isLoading: boolean
  currentChatCount: number
  messageChat: {
    [chatId: string]: MessageEntities
  }
  loadState: LOAD_STATE
  // messages: Message[]
}

export default {
  namespaced: true,
  state: {
    messageChat: {},
    isLoading: false,
    currentChatCount: CHAT_COUNT,
    toLastest: null,
    state: LOAD_STATE.UNLOAD
    // messages: []
  },
  actions: {
    async sendMessage(
      { getters, dispatch }: ActionContext<MessagesState, AppState>,
      message: MessageCreate
    ): Promise<void> {
      const chatId = getters.chatId
      dispatch('addMessage', { chatId, message })
      await sendMessage(chatId, message)
    },
    
    addMessage(
      { commit }: ActionContext<MessagesState, AppState>,
      payload: { chatId: string; message: Message }
    ) {
      commit('addMessage', payload)
    },
    async loadChatMessages({
      getters,
      commit,
      dispatch
    }: ActionContext<MessagesState, AppState>) {
      commit('setLoadState', LOAD_STATE.LOADING_LATEST)
      if (!getters.hasMessages) {
        await dispatch('fetchLatestMessages')
      }
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
        const messageEntities = data.reduce(
          (entity, item) => ({
            ...entity,
            [moment.utc(item.created).valueOf()]: item
          }),
          {}
        )

        commit('setMessageChatEntity', { [chatId]: messageEntities })
      } catch (e) {
        // ..
      }
      commit('setIsLoading', false)
    },
    setLoadState(
      { commit }: ActionContext<MessagesState, AppState>,
      payload: LOAD_STATE
    ) {
      commit('setLoadState', payload)
    }
  },
  mutations: {
    setIsLoading(state: MessagesState, payload: boolean): void {
      state.isLoading = payload
    },
    setCurrentChatCount(state: MessagesState, payload: number): void {
      state.currentChatCount = payload
    },
    setMessageChatEntity(state: MessagesState, payload) {
      state.messageChat = { ...state.messageChat, ...payload }
    },
    setLoadState(state: MessagesState, payload: LOAD_STATE) {
      state.loadState = payload
    },
    addMessage(
      state: MessagesState,
      { chatId, message }: { chatId: string; message: Message }
    ) {
      state.messageChat[chatId][message.custom_json.sending_time] = message
    }
    // setMessages(state: MessagesState, payload: Message[]): void {
    //   state.messages = payload
    // }
  },

  getters: {
    chatId(
      state: MessagesState,
      getters: any,
      rootState: AppState,
      rootGetters: any
    ): string {
      console.log('getters chatId')
      return rootGetters['chats/selectedChatId']
    },
    messageEntities(state: MessagesState, getters): MessageEntities | null {
      console.log('xsxsx', state.messageChat)
      return getters.chatId ? state.messageChat[getters.chatId] : null
    },
    hasMessages(state: MessagesState, getters) {
      return !!getters.messageEntities
    },
    messages(state: MessagesState, getters): Message[] {
      console.log('getters message run')
      return Object.values(getters.messageEntities || {})
    },
    isLoading(state: MessagesState): boolean {
      return state.isLoading
    },
    currentChatCount(state: MessagesState): number {
      return state.currentChatCount
    },
    loadState(state: MessagesState): LOAD_STATE {
      return state.loadState
    }
  }
}
