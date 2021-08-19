import { createLogger, createStore } from 'vuex'
import auth from './auth'
import chats from './chats'
import messages from './messages'

export interface AppState {
  app: string
}

export default createStore<AppState>({
  modules: {
    auth,
    chats,
    messages
  },
  state: {
    app: 'ChatAppVue',
  },
  plugins: [createLogger()],
  mutations: {},
  actions: {},
})
