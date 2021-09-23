import { readMessage } from '@/core/api/chats'
import { CHAT_TYPE } from '@/core/constants'
import { Chat, UserChat } from '@/core/models/chats'
import { UserInfo } from '@/core/models/users'
import { ActionContext } from 'vuex'
import { AppState } from '..'

export default {
  namespaced: true,
  actions:{
    readMessageCurrentChat({ getters }: ActionContext<unknown, AppState>){
        if (getters.lastMessage.id && getters.lastMessage.id > getters.me.last_read) {
          readMessage(getters.chat.id as number, getters.lastMessage.id)
        }
    }
  },
  getters: {
    username(state, getters, rootState, rootGetters: any): string {
      return rootGetters['auth/username']
    },
    chat(state, getters, rootState, rootGetters: any): Chat {
      return rootGetters['chats/selectedChat']
    },
    isDirectChat(state, { chat }) {
      return chat.is_direct_chat
    },
    lastMessage(state, { chat }) {
      return chat.last_message
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
    ): UserChat | null {
      if (newChatUser) {
        return { person: newChatUser }
      }
      if (chat.is_direct_chat) {
        return chat.people
          .filter(p => p.person.username !== username)[0]
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
    me(state, { chat, username }) {
      return chat.people.filter(
        it => it.person && it.person.username === username
      )[0]
    }
  }
}
