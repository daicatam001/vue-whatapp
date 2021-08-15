import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import { getChats, getLatestChats } from '@/api/chats'

export interface ChatState {
  chats: Chat[]
}

export default {
  namespaced: true,
  state: {
    chats: [],
  },
  mutations: {
    setChat(state: ChatState, payload: Chat[]) {
      state.chats = payload
    },
  },
  actions: {
    async getChats({ commit }: ActionContext<ChatState, AppState>) {
      try {
        const { data } = await getChats()
        commit('setChat', data)
      } catch (e) {
        // ..
        throw e
      }
    },
    async getLatestChats(
      { commit }: ActionContext<ChatState, AppState>,
      payload: number
    ) {
      try {
        const { data } = await getLatestChats(payload)
        commit('setChat', data)
      } catch (e) {
        // ..
        throw e
      }
    },
  },
  getters: {
    chats(state: ChatState) {
      return state.chats
    },
  },
}
