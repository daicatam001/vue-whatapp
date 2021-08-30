import { Message, MessageCreate } from '@/core/models/messages'
import baseApi from '../base-api'

export async function getLatestMessage(
  chatId: number,
  count: number
): Promise<{ data: Message[] }> {
  return await baseApi.get(`/chats/${chatId}/messages/latest/${count}/`)
}

export async function sendMessage(
  chatId: number,
  message: MessageCreate
): Promise<Message> {
  // const formData = new FormData()
  // formData.append('text', message.text!)
  // formData.append('sender_username', message.sender_username)
  // formData.append(
  //   'custom_json',
  //   JSON.stringify(message.custom_json ? message.custom_json : {})
  // )
  // return await baseApi.post(`chats/${chatId}/messages/`, formData, {
  //   headers: {
  //     'content-type': 'multipart/form-data'
  //   }
  // })
  message = {
    ...message,
    custom_json: JSON.stringify(message.custom_json || {})
  }
  return await baseApi.post(`chats/${chatId}/messages/`, message)
}

export async function updateMessage(
  chatId: number,
  messageId: number,
  message: Partial<Message>
): Promise<Message> {
  message = { ...message, custom_json: JSON.stringify(message.custom_json) }
  return await baseApi.patch(`chats/${chatId}/messages/${messageId}/`, message)
}
