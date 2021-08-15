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
    chats: []
  },
  mutations: {
    setChat(state: ChatState, payload: Chat[]): void {
      state.chats = payload
    }
  },
  actions: {
    async getChats({
      commit
    }: ActionContext<ChatState, AppState>): Promise<void> {
      const { data } = await getChats()
      commit('setChat', data)
    },
    async getLatestChats(
      { commit }: ActionContext<ChatState, AppState>,
      payload: number
    ): Promise<void> {
      const { data } = await getLatestChats(payload)
      commit('setChat', data)
    }
  },
  getters: {
    chats(state: ChatState): Chat[] {
      return state.chats
    }
  }
}
