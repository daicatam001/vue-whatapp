import { ActionContext } from 'vuex'
import { AppState } from '@/store'

export interface UIState {
  showProfile: boolean
}

export default {
  namespaced: true,
  state: {
    showProfile: null
  },
  actions: {
    toggleShowProfile(
      { commit }: ActionContext<UIState, AppState>,
      payload: boolean
    ): void {
      try {
        commit('setShowProfile', payload)
      } catch (e) {
        // ..
      }
    }
  },
  mutations: {
    setShowProfile(state: UIState, payload: boolean): void {
      state.showProfile = payload
    }
  },
  getters: {
    showProfile({ showProfile }: UIState) {
      return showProfile
    }
  }
}
