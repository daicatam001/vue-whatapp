import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Message, MessageCreate } from '@/core/models/messages'
import {
  getLatestMessage,
  sendMessage,
  updateMessage
} from '@/core/api/messages'
import { LOAD_STATE } from '@/core/constants'
import { Chat } from '@/core/models/chats'
import { message } from 'ant-design-vue'

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
}

export default {
  namespaced: true,
  state: {
    isLoading: false,
    currentChatCount: CHAT_COUNT,
    toLastest: null
  },
  actions: {
    async sendMessage(
      { getters, dispatch }: ActionContext<MessagesState, AppState>,
      { message, chatId }: { message: MessageCreate; chatId: number }
    ): Promise<void> {
      chatId = chatId || getters.chatId
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
      dispatch
    }: ActionContext<MessagesState, AppState>) {
      dispatch('ui/setToNewestMessage', true, { root: true })
      await dispatch('fetchLatestMessages')
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
            [item.custom_json.sending_time]: item
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
    }
  },
  mutations: {
    setIsLoading(state: MessagesState, payload: boolean): void {
      state.isLoading = payload
    },
    setCurrentChatCount(state: MessagesState, payload: number): void {
      state.currentChatCount = payload
    }
  },

  getters: {
    chat(state, getters, rootState, rootGetters: any): Chat {
      return rootGetters['chat/chat']
    },
    chatId(state, getters): string {
      return getters.chat.id
    },
    leftTime(state, getters, rootState, rootGetters): Chat {
      return rootGetters['chat/leftTime']
    },
    messageEntities(
      state,
      getters,
      rootState,
      rootGetters: any
    ): MessageEntities | null {
      return rootGetters['chats/selectedMessageEntities']
    },
    messages(state: MessagesState, getters): Message[] {
      let messages = Object.values(getters.messageEntities || {}) as Message[]
      if (getters.leftTime) {
        messages = messages.filter(
          item => item.custom_json.sending_time <= getters.leftTime
        )
      }
      return messages
    },
    isLoading(state: MessagesState): boolean {
      return state.isLoading
    },
    currentChatCount(state: MessagesState): number {
      return state.currentChatCount
    }
  }
}
