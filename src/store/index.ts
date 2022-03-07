import { createLogger, createStore } from 'vuex'
import auth from './auth'
import chats from './chats'
import messages from './messages'
import ui from './ui'
import chat from './chat'
import phoneBook from './phone-book'
import { ENVIRONMENT } from '@/core/constants'

export interface AppState {
  app: string
}

export default createStore<AppState>({
  modules: {
    auth,
    chats,
    chat,
    messages,
    phoneBook,
    ui
  },
  state: {
    app: 'ChatAppVue'
  },
  plugins: [createLogger()],
  mutations: {},
  actions: {}
})
