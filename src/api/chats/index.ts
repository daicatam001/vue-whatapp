import baseApi from '@/api/base-api'
import { Chat } from '@/core/models/chats'

export async function getChats(): Promise<{ data:Chat[] }> {
  return await baseApi.get(`/chats`)
}

export async function getLatestChats(count: number): Promise<{ data:Chat[] }> {
  return await baseApi.get(`/chats/latest/${count}`)
}
