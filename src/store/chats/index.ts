import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { Chat } from '@/core/models/chats'
import { createChat, getChats, getLatestChats } from '@/core/api/chats'
import moment from 'moment'

export interface ChatEntities {
  [key: number]: Chat
}
export interface ChatsState {
  newChatTitle: string
  selectedChatId: number
  chatEntites: ChatEntities
}

export default {
  namespaced: true,
  state: {
    chatEntites: {},
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
        // ..
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
    }
  },
  getters: {
    selectedChatId(state: ChatsState): number {
      return state.selectedChatId
    },
    newChatTitle(state: ChatsState): string {
      return state.newChatTitle
    },
    chatEntities({ chatEntites }: ChatsState) {
      return chatEntites
    },
    chats(state: ChatsState, getters): Chat[] {
      return Object.values(getters.chatEntities as ChatEntities).sort(
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
