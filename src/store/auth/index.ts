import apiService from '@/services/ApiService'
import {ActionContext} from "vuex";
import {AppState} from "@/store";
import {AuthRegister, UserInfo} from "@/core/models";
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
        async register({commit}: ActionContext<AuthState, AppState>, authData: AuthRegister) {
            try {
                const {data} = await apiService.register(authData)
                commit('setUserInfo', data)
                message.success('Register success')
            } catch (e) {
                message.error(e.response.data.message)
            }

        }
    },
}
