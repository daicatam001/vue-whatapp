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
 
    if (!chat.is_direct_chat && chat.title.includes(query)) {
      return true
    }
    const members = chat.people.filter(p => p.person.username != myUsername)
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

export async function createChat(
  title: string,
  isDirectChat = true
): Promise<{ data: Chat }> {
  return await baseApi.post('/chats/', {
    title,
    is_direct_chat: isDirectChat
  })
}

export async function addChatMember(
  chatId: number,
  username: string
): Promise<{ data: any }> {
  return await baseApi.post(`/chats/${chatId}/people/`, { username })
}

export async function readMessage(chatId: number, messageId: number) {
  return await baseApi.patch(`/chats/${chatId}/people/`, {
    last_read: messageId
  })
}

export async function deleteChat(chatId: number) {
  return await baseApi.delete(`/chats/${chatId}/`)
}
