import { ActionContext } from 'vuex'
import { AppState } from '@/store'

export interface UIState {
  showProfile: boolean
  showChatInfo: boolean
}

export default {
  namespaced: true,
  state: {
    showProfile: false,
    showChatInfo: false
  },
  actions: {
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
    }
  }
}
