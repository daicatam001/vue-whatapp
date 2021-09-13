import { CHAT_TYPE } from '@/core/constants'
import { Chat } from '@/core/models/chats'
import { UserInfo } from '@/core/models/users'

export default {
  namespaced: true,
  getters: {
    username(state, getters, rootState, rootGetters: any): string {
      return rootGetters['auth/username']
    },
    chat(state, getters, rootState, rootGetters: any): Chat {
      return rootGetters['chats/selectedChat']
    },
    newChatUser(state, getters, rootState, rootGetters: any): UserInfo {
      return rootGetters['chats/newChatUser']
    },
    type(state, { chat, newChatUser }) {
      if (newChatUser || chat.is_direct_chat) {
        return CHAT_TYPE.DIRECT
      }
      return CHAT_TYPE.GROUP
    },
    directChatUser(
      state,
      {
        newChatUser,
        chat,
        username
      }: { newChatUser: UserInfo; chat: Chat; username: string }
    ) {
      if (newChatUser) {
        return newChatUser
      }
      if (chat.is_direct_chat) {
        return chat.people
          .filter(p => p.person.username !== username)
          .map(item => ({ last_read: item.last_read, ...item.person }))[0]
      }
      return null
    },
    members(
      state,
      { chat, username }
    ): { person: UserInfo; last_read: number }[] {
      return chat.people.filter(
        it => it.person && it.person.username !== username
      )
    },
    // title(state, { newChatUser, chat }) {
    //   if (newChatUser) {
    //     return newChatUser.first_name
    //   }
    // },

   
    // directUser(state, { members }) {
    //   return members.length === 1
    //     ? members[0]
    //     : {
    //         person: {}
    //       }
    // },
    // isOnline(state, { directUser }): boolean {
    //   return directUser.person.is_online
    // },
    // chatUpdated(state, { directUser }): string {
    //   return directUser.chat_updated
    // },
    // title(state, { directUser, chat }): string {
    //   if (directUser) {
    //     return `${directUser.person.first_name}`
    //   }
    //   return chat.title
    // }
  }
}
