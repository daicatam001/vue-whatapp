import { createLogger, createStore } from 'vuex'
import auth from './auth'
import chats from './chats'
import messages from './messages'
import ui from './ui'

export interface AppState {
  app: string
}

export default createStore<AppState>({
  modules: {
    auth,
    chats,
    messages,
    ui
  },
  state: {
    app: 'ChatAppVue',
  },
  plugins: [createLogger()],
  mutations: {},
  actions: {},
})
