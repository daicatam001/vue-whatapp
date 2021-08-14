import {createLogger, createStore} from 'vuex'
import auth from './auth'
import chats from './chats'
export interface AppState {
    app: string
}

export default createStore<AppState>({
    modules: {
        auth,
        chats
    },
    state: {
        app: 'ChatAppVue'
    },
    plugins:[createLogger()],
    mutations: {},
    actions: {},
})
