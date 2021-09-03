import { Chat } from '@/core/models/chats'
import { UserInfo } from '@/core/models/users'

export default {
  namespaced: true,
  getters: {
    chat(state, getters, rootState, rootGetters: any): Chat {
      return rootGetters['chats/selectedChat']
    },
    username(state, getters, rootState, rootGetters: any): string {
      return rootGetters['auth/username']
    },
    members(
      state,
      { chat, username }
    ): { person: UserInfo; last_read: number }[] {
      return chat.people.filter(
        it => it.person && it.person.username !== username
      )
    },
    directUser(state, { members }) {
      return members.length === 1
        ? members[0]
        : {
            person: {}
          }
    },
    isOnline(state, { directUser }): boolean {
      return directUser.person.is_online
    },
    chatUpdated(state, { directUser }): string {
      return directUser.chat_updated
    },
    title(state, { directUser, chat }): string {
      if (directUser) {
        return `${directUser.person.first_name}`
      }
      return chat.title
    }
  }
}
