import { ActionContext } from 'vuex'
import { AppState } from '@/store'
import { AuthLogin, AuthRegister, UserInfo } from '@/core/models/users'
import { message } from 'ant-design-vue'
import router from '@/router'
import { login, register } from '@/api/auth'

export interface AuthState {
  userInfo: UserInfo
}

export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state: AuthState, data: UserInfo): void {
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      } else {
        localStorage.clear()
      }
      state.userInfo = data
    }
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
      try {
        const { data } = await register(payload)
        commit('setUserInfo', { ...data, secret: payload.secret })
        message.success('Register success')
        router.replace({
          name: 'home'
        })
      } catch (e) {
        message.error(e.response.data.message)
      }
    },
    async login(
      { commit }: ActionContext<AuthState, AppState>,
      payload: AuthLogin
    ): Promise<void> {
      try {
        const { data } = await login(payload.username, payload.secret)
        commit('setUserInfo', { ...data, secret: payload.secret })
        message.success('Login success')
        router.replace({
          name: 'home'
        })
      } catch (e) {
        message.error('Username or Password is not correct')
      }
    },
    async logout({
      commit
    }: ActionContext<AuthState, AppState>): Promise<void> {
      commit('setUserInfo', null)
      router.replace({
        name: 'login'
      })
    }
  },
  getters: {
    isAuth(state: AuthState): boolean {
      return !!state.userInfo
    },
    userInfo(state: AuthState): UserInfo {
      return state.userInfo
    },
    username(state: AuthState): string | null {
      return state.userInfo ? state.userInfo.username : null
    },
    secret(state: AuthState): string | null | undefined {
      return state.userInfo ? state.userInfo.secret : null
    }
  }
}
