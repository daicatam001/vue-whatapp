import baseApi from '@/core/api/base-api'
import { Chat } from '@/core/models/chats'

export async function getChats(): Promise<{ data: Chat[] }> {
  return await baseApi.get(`/chats/`)
}

export async function getLatestChats(count: number): Promise<{ data: Chat[] }> {
  return await baseApi.get(`/chats/latest/${count}`)
}

export async function createChat(title: string): Promise<{ data: Chat }> {
  return await baseApi.post('/chats/', {
    title,
    is_direct_chat: false
  })
}
