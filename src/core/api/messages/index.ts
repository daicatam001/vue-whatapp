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
  return await baseApi.post(`chats/${chatId}/messages/`, message)
}
