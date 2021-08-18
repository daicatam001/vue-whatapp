import store from '@/store'
import { PROJECT_ID } from '@/core/constants'
import { getOrCreateSession } from '@/api/auth'
import { SocketData } from './models'
import { Chat } from '@/core/models/chats'

const SOCKET_ACTION_NEW_CHAT = 'new_chat'

export async function setupSocket(): Promise<void> {
  const username = store.getters['auth/username']
  const secret = store.getters['auth/secret']
  await getOrCreateSession()

  const conn = new WebSocket(
    `wss://api.chatengine.io/person/?publicKey=${PROJECT_ID}&username=${username}&secret=${secret}`
  )

  conn.onopen = event => {
    console.log('connect success', event)
  }
  conn.onmessage = event => {
    const socketData = JSON.parse(event.data) as SocketData
    switch (socketData.action) {
      case SOCKET_ACTION_NEW_CHAT:
        onNewChat(socketData.data)
    }
  }
}

function onNewChat(chat: Chat) {
  const chats = store.getters['chats/chats']
  store.dispatch('chats/setChats', [...chats, chat])
}
