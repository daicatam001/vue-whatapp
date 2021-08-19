import { Message } from '@/core/models/messages'
import baseApi from '../base-api'

export async function getLatestMessage(
  chatId: number,
  count: number
): Promise<{ data: Message[] }> {
  return await baseApi.get(`/chats/${chatId}/messages/latest/${count}`)
}
