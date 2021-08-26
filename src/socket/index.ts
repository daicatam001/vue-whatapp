import store from '@/store'
import { PROJECT_ID } from '@/core/constants'
import { getOrCreateSession } from '@/core/api/auth'
import { SocketData } from './models'
import { Chat } from '@/core/models/chats'
import { Message } from '@/core/models/messages'

const SOCKET_ACTION_NEW_CHAT = 'new_chat'
const SOCKET_ACTION_EDIT_CHAT = 'edit_chat'

const SOCKET_ACTION_NEW_MESSAGE = 'new_message'

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
    console.log(socketData)
    switch (socketData.action) {
      case SOCKET_ACTION_NEW_CHAT:
        onNewChat(socketData.data)
        break
      case SOCKET_ACTION_EDIT_CHAT:
        onEditChat(socketData.data)
        break
      case SOCKET_ACTION_NEW_MESSAGE:
        onNewMessage(socketData.data)
    }
  }
}

function onNewChat(data: Chat) {
  const chats = store.getters['chats/chats']
  store.dispatch('chats/setChats', [...chats, data])
}

function onEditChat(data: Chat) {
  const chatEntites = store.getters['chats/chatEntities']
  const newChatEntities = { ...chatEntites, [data.id]: data }
  console.log(newChatEntities)
  store.dispatch('chats/setChatEntities', newChatEntities)
}
function onNewMessage({
  id,
  message
}: { id: string; message: Message }) {
  // data = null
  store.dispatch('messages/addMessage', { chatId: id, message })
}
