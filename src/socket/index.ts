import store from '@/store'
import { MESSAGE_TYPE, PROJECT_ID, SEND_STATE } from '@/core/constants'
import { getOrCreateSession } from '@/core/api/auth'
import { SocketData } from './models'
import { Chat } from '@/core/models/chats'
import { Message } from '@/core/models/messages'
import { readMessage } from '@/core/api/chats'
import { formatChat } from '@/core/helpers'

const SOCKET_ACTION_NEW_CHAT = 'new_chat'
const SOCKET_ACTION_EDIT_CHAT = 'edit_chat'
const SOCKET_ACTION_DELETE_CHAT = 'delete_chat'
const SOCKET_ACTION_ADD_PERSON = 'add_person'

const SOCKET_ACTION_NEW_MESSAGE = 'new_message'
const SOCKET_ACTION_EDIT_MESSAGE = 'edit_message'

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
    console.log(socketData.action, socketData.data)
    switch (socketData.action) {
      case SOCKET_ACTION_NEW_CHAT:
        onNewChat(socketData.data)
        break
      case SOCKET_ACTION_ADD_PERSON:
        onAddPerson(socketData.data)
        break
      case SOCKET_ACTION_EDIT_CHAT:
        onEditChat(socketData.data)
        break
      case SOCKET_ACTION_DELETE_CHAT:
        onDeleteChat(socketData.data)
        break
      case SOCKET_ACTION_NEW_MESSAGE:
        onNewMessage(socketData.data)
        break
      case SOCKET_ACTION_EDIT_MESSAGE:
        onEditMessage(socketData.data)
    }
  }
}

function onNewChat(data: Chat) {
  data = formatChat(data)
  store.dispatch('chats/updateChat', { ...data, messageEntities: {} })
}

function onAddPerson(data: Chat) {
  data = formatChat(data)
  store.dispatch('chats/updateChat', { ...data })
}

function onEditChat(data: Chat) {
  // setTimeout(() => {
  // data.last_message.custom_json = JSON.stringify(data.last_message.custom_json)
  const { last_message, ...chatData } = data
  const formatedChat = formatChat(chatData as Chat)
  store.dispatch('chats/updateChat', formatedChat)
  // }, 500)
}

function onDeleteChat(data: Chat) {
  const chatEntities = { ...store.getters['chats/chatEntities'] }
  delete chatEntities[data.id]
  store.dispatch('chats/setChatEntities', chatEntities)
}

function onNewMessage({ id, message }: { id: number; message: Message }) {
  // data = null
  const selectedChatId = store.getters['chats/selectedChatId']
  if (selectedChatId === id) {
    readMessage(id, message.id)
  }
  const custom_json = JSON.parse(message.custom_json as string)

  const username = store.getters['auth/username']
  if (
    custom_json.type == MESSAGE_TYPE.MESSAGE &&
    custom_json.state == SEND_STATE.SENDING &&
    message.sender_username === username
  ) {
    store.dispatch('messages/editMessage', {
      chatId: id,
      messageId: message.id,
      message: {
        custom_json: {
          ...custom_json,
          state: SEND_STATE.RECEIVED
        }
      }
    })
    store.dispatch('chats/addMessage', {
      chatId: id,
      message: {
        ...message,
        custom_json: { ...custom_json, state: SEND_STATE.SENT }
      }
    })
  } else {
    store.dispatch('chats/addMessage', {
      chatId: id,
      message: {
        ...message,
        custom_json: custom_json
      }
    })
  }
}

function onEditMessage({ id, message }: { id: number; message: Message }) {
  if (typeof message.custom_json === 'string') {
    message.custom_json = JSON.parse(message.custom_json)
  }
  store.dispatch('chats/updateMessage', { chatId: id, message })
}
