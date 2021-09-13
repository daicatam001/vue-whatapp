import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Message, MessageCreate } from '@/core/models/messages'
import {
  getLatestMessage,
  sendMessage,
  updateMessage
} from '@/core/api/messages'
import { LOAD_STATE } from '@/core/constants'
import moment from 'moment'
import { Chat } from '@/core/models/chats'
import { createChat } from '@/core/api/chats'

const CHAT_COUNT = 20

export interface MessageEntities {
  [key: number]: Message
}
export interface MessageChatEntites {
  [key: number]: MessageEntities
}
export interface MessagesState {
  isLoading: boolean
  currentChatCount: number
  loadState: LOAD_STATE
  // messages: Message[]
}

export default {
  namespaced: true,
  state: {
    // messageChat: {},
    isLoading: false,
    currentChatCount: CHAT_COUNT,
    toLastest: null,
    state: LOAD_STATE.UNLOAD
    // messages: []
  },
  actions: {
    async sendMessage(
      {
        getters,
        dispatch,
      }: ActionContext<MessagesState, AppState>,
      message: MessageCreate
    ): Promise<void> {
      const chatId = getters.chatId
      dispatch('chats/addMessage', { chatId, message }, { root: true })
      await sendMessage(chatId, message)
    },
    async editMessage(
      _: ActionContext<MessagesState, AppState>,
      {
        message,
        chatId,
        messageId
      }: { message: Partial<Message>; chatId: number; messageId: number }
    ): Promise<void> {
      await updateMessage(chatId, messageId, message)
    },
    async loadChatMessages({
      commit,
      dispatch
    }: ActionContext<MessagesState, AppState>) {
      commit('setLoadState', LOAD_STATE.LOADING_LATEST)
      // if (!getters.hasMessages) {
      await dispatch('fetchLatestMessages')
      // }
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
      dispatch,
      getters
    }: ActionContext<MessagesState, AppState>): Promise<void> {
      commit('setIsLoading', true)
      try {
        const chatId = getters.chatId
        const chatCount = getters.currentChatCount
        const { data } = await getLatestMessage(chatId, chatCount)
        const messageEntities = data.reduce((entity, item) => {
          item.custom_json = item.custom_json
            ? JSON.parse(item.custom_json)
            : {}
          return {
            ...entity,
            [moment.utc(item.created).valueOf()]: item
          }
        }, {})

        // commit('setMessageChatEntity', { [chatId]: messageEntities })
        dispatch(
          'chats/setMessageEntities',
          { chatId, messageEntities },
          {
            root: true
          }
        )
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
    setLoadState(state: MessagesState, payload: LOAD_STATE) {
      state.loadState = payload
    }
    // addMessage(
    //   state: MessagesState,
    //   { chatId, message }: { chatId: string; message: Message }
    // ) {
    //   state.messageChat[chatId][message.custom_json.sending_time] = message
    // }
    // setMessages(state: MessagesState, payload: Message[]): void {
    //   state.messages = payload
    // }
  },

  getters: {
    chatId(state, getters, rootState, rootGetters: any): string {
      return rootGetters['chats/selectedChatId']
    },
    chat(state, getters, rootState, rootGetters: any): Chat {
      return rootGetters['chats/selectedChat']
    },
    messageEntities(
      state,
      getters,
      rootState,
      rootGetters: any
    ): MessageEntities | null {
      // return getters.chatId ? state.messageChat[getters.chatId] : null
      return rootGetters['chats/selectedMessageEntities']
    },
    // hasMessages(state: MessagesState, getters) {
    //   return !!getters.messageEntities
    // },
    messages(state: MessagesState, getters): Message[] {
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
