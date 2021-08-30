import { createChat, getChats, getLatestChats, searchChats } from "@/core/api/chats"
import { Chat } from "@/core/models/chats"
import { ActionContext } from "vuex"
import { ChatEntities, ChatsState } from "."
import { AppState } from ".."

export default {
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
    // dispatch('messages/fetchLatestMessages', null, { root: true })
    dispatch('messages/loadChatMessages', null, { root: true })
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
  },
  async searchChats(
    { commit, rootGetters }: ActionContext<ChatsState, AppState>,
    payload: string
  ): Promise<void> {
    commit('setQuery', payload)
    if (!payload) {
      commit('setSearchedChats', [])
      return
    }
    commit('setIsSearching', true)
    const username = rootGetters['auth/username']
    let result = [] as Partial<Chat>[]
    const { data } = await searchChats(payload, username)
    if (data.length) {
      result = result.concat([
        {
          title: 'Trò chuyện',
          isHeading: true,
          id: 'conversation'
        } as Partial<Chat>,
        ...data
      ])
    }
    commit('setSearchedChats', result)
    commit('setIsSearching', false)
  },
  offSearchChats({ commit }: ActionContext<ChatsState, AppState>) {
    commit('setQuery', '')
    commit('setSearchedChats', [])
  }
}
