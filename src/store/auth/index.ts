import apiService from '@/services/ApiService'
import {ActionContext} from "vuex";
import {AppState} from "@/store";
import {AuthLogin, AuthRegister, UserInfo} from "@/core/models";
import {message} from "ant-design-vue";

export interface AuthState {
    userInfo: UserInfo
}

export default {
    namespaced: true,
    state: {},
    mutations: {
        setUserInfo(state: AuthState, data: UserInfo) {
            state.userInfo = data
        }
    },
    actions: {
        async register({commit}: ActionContext<AuthState, AppState>, payload: AuthRegister) {
            try {
                const {data} = await apiService.register(payload)
                commit('setUserInfo', data)
                message.success('Register success')
            } catch (e) {
                message.error(e.response.data.message)
            }
        },
        async login({commit}: ActionContext<AuthState, AppState>, payload: AuthLogin) {
            try {
                const {data} = await apiService.login(payload.username, payload.secret)
                commit('setUserInfo', data)
                message.success('Login success')
            } catch (e) {
                message.error('Username or Password is not correct')
            }
        }
    },
}
