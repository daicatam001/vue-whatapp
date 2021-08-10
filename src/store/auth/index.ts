import apiService from '@/services/ApiService'
import {ActionContext} from "vuex";
import {AppState} from "@/store";
import {AuthRegister, UserInfo} from "@/core/models";

export interface AuthState {
    userInfo: UserInfo
}

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async register({commit}: ActionContext<AuthState, AppState>, authData: AuthRegister) {
            try {
                const {data} = await apiService.register(authData)
            } catch (e) {
                alert(e.response.data.message)
            }

        }
    },
}
