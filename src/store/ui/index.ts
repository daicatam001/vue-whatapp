import { ActionContext } from 'vuex'
import { AppState } from '@/store'

export interface UIState {
  messageInputFocus: number
  showProfile: boolean
  showChatInfo: boolean
}

export default {
  namespaced: true,
  state: {
    messageInputFocus: null,
    showProfile: false,
    showChatInfo: false
  },
  actions: {
    focusMessageInput(
      { commit }: ActionContext<UIState, AppState>,
    ): void {
      commit('setMessageInputFocus', Date.now())
    },
    toggleShowProfile(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowProfile', payload)
    },
    toggleShowChatInfo(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      commit('setShowChatInfo', payload)
    }
  },
  mutations: {
    setMessageInputFocus(state: UIState, payload: number): void {
      state.messageInputFocus = payload
    },
    setShowProfile(state: UIState, payload: boolean): void {
      state.showProfile = payload
    },
    setShowChatInfo(state: UIState, payload: boolean): void {
      state.showChatInfo = payload
    }
  },
  getters: {
    showProfile({ showProfile }: UIState) {
      return showProfile
    },
    showChatInfo({ showChatInfo }: UIState) {
      return showChatInfo
    },
    messageInputFocus({ messageInputFocus }: UIState) {
      return messageInputFocus
    }
  }
}
