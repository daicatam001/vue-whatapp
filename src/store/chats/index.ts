import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import { createChat, getChats, getLatestChats } from '@/core/api/chats'

export interface ChatsState {
  newChatTitle: string
  selectedChatId: number
  chats: Chat[]
}

export default {
  namespaced: true,
  state: {
    chats: [],
    selectedChatId: null,
    newChatTitle: ''
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
        console.log(e)
      }
    },
    selectChat(
      { commit, dispatch }: ActionContext<ChatsState, AppState>,
      payload: number
    ): void {
      commit('setSelectedChatId', payload)
      dispatch('messages/fetchLatestMessages', null, { root: true })
    },
    async getChats({
      commit
    }: ActionContext<ChatsState, AppState>): Promise<void> {
      const { data } = await getChats()
      commit('setChats', data)
    },
    async setChats(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: Chat[]
    ): Promise<void> {
      commit('setChats', payload)
    },
    async getLatestChats(
      { commit }: ActionContext<ChatsState, AppState>,
      payload: number
    ): Promise<void> {
      const { data } = await getLatestChats(payload)
      commit('setChats', data)
    }
  },
  mutations: {
    setSelectedChatId(state: ChatsState, payload: number): void {
      state.selectedChatId = payload
    },
    setNewChatTitle(state: ChatsState, payload: string): void {
      state.newChatTitle = payload
    },
    setChats(state: ChatsState, payload: Chat[]): void {
      state.chats = payload
    }
  },
  getters: {
    selectedChatId(state: ChatsState): number {
      return state.selectedChatId
    },
    newChatTitle(state: ChatsState): string {
      return state.newChatTitle
    },
    chats(state: ChatsState): Chat[] {
      return state.chats
    }
  }
}
