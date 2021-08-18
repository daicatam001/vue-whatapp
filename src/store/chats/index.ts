import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import { createChat, getChats, getLatestChats } from '@/api/chats'

export interface ChatState {
  newChatTitle: string
  chats: Chat[]
}

export default {
  namespaced: true,
  state: {
    chats: [],
    newChatTitle: ''
  },
  mutations: {
    setNewChatTitle(state: ChatState, payload: string): void {
      state.newChatTitle = payload
    },
    setChats(state: ChatState, payload: Chat[]): void {
      state.chats = payload
    }
  },
  actions: {
    onInput(
      { commit }: ActionContext<ChatState, AppState>,
      payload: string
    ): void {
      commit('setNewChatTitle', payload)
    },
    async createNewChat({
      state,
      commit
    }: ActionContext<ChatState, AppState>): Promise<void> {
      if (!state.newChatTitle) {
        return
      }
      try {
        await createChat(state.newChatTitle)
        commit('setNewChatTitle', '')
      } catch (e) {
        console.log(e)
      }
    },
    async getChats({
      commit
    }: ActionContext<ChatState, AppState>): Promise<void> {
      const { data } = await getChats()
      commit('setChats', data)
    },
    async setChats(
      { commit }: ActionContext<ChatState, AppState>,
      payload: Chat[]
    ): Promise<void> {
      commit('setChats', payload)
    },
    async getLatestChats(
      { commit }: ActionContext<ChatState, AppState>,
      payload: number
    ): Promise<void> {
      const { data } = await getLatestChats(payload)
      commit('setChats', data)
    }
  },
  getters: {
    newChatTitle(state: ChatState): string {
      return state.newChatTitle
    },
    chats(state: ChatState): Chat[] {
      return state.chats
    }
  }
}
