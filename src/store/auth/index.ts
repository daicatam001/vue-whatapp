import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { AuthLogin, AuthRegister, UserInfo } from '@/core/models/users'
import { login, register, update } from '@/core/api/auth'

export interface AuthState {
  userInfo: UserInfo
}

export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  actions: {
    tryLogin({ commit }: ActionContext<AuthState, AppState>): void {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        commit('setUserInfo', userInfo)
      } catch (e) {
        // ..
      }
    },
    async register(
      { commit }: ActionContext<AuthState, AppState>,
      payload: AuthRegister
    ): Promise<void> {
      const { data } = await register(payload)
      commit('setUserInfo', { ...data, secret: payload.secret })
    },
    async login(
      { commit }: ActionContext<AuthState, AppState>,
      payload: AuthLogin
    ): Promise<void> {
      const { data } = await login(payload.username, payload.secret)
      commit('setUserInfo', { ...data, secret: payload.secret })
    },
    async logout({
      commit
    }: ActionContext<AuthState, AppState>): Promise<void> {
      commit('setUserInfo', null)
    },
    async update(
      { commit }: ActionContext<AuthState, AppState>,
      payload: Partial<UserInfo>
    ): Promise<void> {
      commit('updateUserInfo', payload)
      const { data } = await update(payload)
      commit('updateUserInfo', data)
    }
  },
  mutations: {
    updateUserInfo(state: AuthState, data: UserInfo): void {
      state.userInfo = { ...state.userInfo, ...data }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    setUserInfo(state: AuthState, data: UserInfo): void {
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      } else {
        localStorage.clear()
      }
      state.userInfo = data
    }
  },
  getters: {
    isAuth(state: AuthState): boolean {
      return !!state.userInfo
    },
    userInfo(state: AuthState): UserInfo {
      return state.userInfo
    },
    fullName(state: AuthState): string {
      return state.userInfo.first_name
    },
    username(state: AuthState): string | null {
      return state.userInfo ? state.userInfo.username : null
    },
    customInfo(state: AuthState): any {
      return state.userInfo.custom_json
    },
    introduce(state, { customInfo }): string {
      return customInfo.introduce
    },
    secret(state: AuthState): string | null | undefined {
      return state.userInfo ? state.userInfo.secret : null
    }
  }
}
