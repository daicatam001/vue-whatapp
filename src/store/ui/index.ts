import { ActionContext } from 'vuex'
import { AppState } from '@/store'

export interface UIState {
  messageInputFocus: number
  showProfile: boolean
  showChatInfo: boolean
  showAddMembers: boolean
  showCreateGroup: boolean
  toNewestMessage: boolean
}

export default {
  namespaced: true,
  state: {
    messageInputFocus: null,
    showAddMembers: false,
    showCreateGroup: false,
    showProfile: false,
    showChatInfo: false,
    toNewestMessage: true
  },
  actions: {
    focusMessageInput({ commit }: ActionContext<UIState, AppState>): void {
      commit('setMessageInputFocus', Date.now())
    },
    setToNewestMessage(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setToNewestMessage', payload)
    },
    toggleShowProfile(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowProfile', payload)
    },
    toggleShowCreateGroup(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowCreateGroup', payload)
    },
    toggleShowAddMembers(
      { commit, dispatch }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowAddMembers', payload)
    },
    toggleShowChatInfo(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowChatInfo', payload)
    },
    goToCreateGroup({ commit }: ActionContext<UIState, AppState>): void {
      commit('setShowAddMembers', false)
      commit('setShowCreateGroup', true)
    },
    backToAddMembers({ commit }: ActionContext<UIState, AppState>): void {
      commit('setShowAddMembers', true)
      commit('setShowCreateGroup', false)
    }
  },
  mutations: {
    setMessageInputFocus(state: UIState, payload: number): void {
      state.messageInputFocus = payload
    },
    setToNewestMessage(state: UIState, payload: boolean): void {
      state.toNewestMessage = payload
    },
    setShowProfile(state: UIState, payload: boolean): void {
      state.showProfile = payload
    },
    setShowChatInfo(state: UIState, payload: boolean): void {
      state.showChatInfo = payload
    },
    setShowAddMembers(state: UIState, payload: boolean): void {
      state.showAddMembers = payload
    },
    setShowCreateGroup(state: UIState, payload: boolean): void {
      state.showCreateGroup = payload
    }
  },
  getters: {
    showProfile({ showProfile }: UIState) {
      return showProfile
    },
    toNewestMessage({ toNewestMessage }: UIState) {
      return toNewestMessage
    },
    showCreateGroup({ showCreateGroup }: UIState) {
      return showCreateGroup
    },
    showChatInfo({ showChatInfo }: UIState) {
      return showChatInfo
    },
    showAddMembers({ showAddMembers }: UIState) {
      return showAddMembers
    },
    messageInputFocus({ messageInputFocus }: UIState) {
      return messageInputFocus
    }
  }
}
