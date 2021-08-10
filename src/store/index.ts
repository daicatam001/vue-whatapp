import {createStore} from 'vuex'
import auth from './auth'

export interface AppState {
    app: string
}

export default createStore<AppState>({
    modules: {
        auth
    },
    state: {
        app: 'ChatAppVue'
    },
    mutations: {},
    actions: {},
})
