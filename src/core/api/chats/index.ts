import baseApi from '@/core/api/base-api'
import { Chat } from '@/core/models/chats'

export async function getChats(): Promise<{ data: Chat[] }> {
  return await baseApi.get(`/chats/`)
}

export async function searchChats(
  query: string,
  myUsername: string
): Promise<{ data: Chat[] }> {
  const { data } = await getChats()
  const result = data.filter((chat: Chat) => {
    const members = chat.people.filter(p => p.person.username != myUsername)
    if (members.length > 1 && chat.title.includes(query)) {
      return true
    }
    if (
      members.find(
        p =>
          (p.person.first_name && p.person.first_name.includes(query)) ||
          (p.person.email && p.person.email.includes(query))
      )
    ) {
      return true
    }
  })
  return { data: result }
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
