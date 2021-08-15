import baseApi from '@/api/base-api'

export async function getChats() {
  return await baseApi.get(`/chats`)
}

export async function getLatestChats(count: number) {
  return await baseApi.get(`/chats/latest/${count}`)
}
