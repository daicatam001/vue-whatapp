import { ALPHABET, CHAT_CARD_TYPE } from '@/core/constants'
import { UserInfo } from '@/core/models/users'
import { ActionContext } from 'vuex'
import { AppState } from '..'

export interface PhoneBookState {
  phoneBook: UserInfo[]
  query: string
}

export default {
  namespaced: true,
  state: {
    phoneBook: [],
    query: ''
  },
  actions: {
    setPhoneBook(
      { commit }: ActionContext<PhoneBookState, AppState>,
      payload: UserInfo[]
    ): void {
      commit('setPhoneBook', payload)
    },
    setQuery(
      { commit }: ActionContext<PhoneBookState, AppState>,
      payload: string
    ): void {
      commit('setQuery', payload)
    }
  },
  mutations: {
    setPhoneBook(state: PhoneBookState, payload: UserInfo[]): void {
      state.phoneBook = payload
    },
    setQuery(state: PhoneBookState, payload: string): void {
      state.query = payload
    }
  },
  getters: {
    phoneBook({ phoneBook }: PhoneBookState) {
      return phoneBook
    },
    query({ query }: PhoneBookState) {
      return query
    },
    phoneBookFilter(state: PhoneBookState, { phoneBook, query }) {

      if (!query) {
        return phoneBook
      }
      const queryL = query.toLowerCase()
      return phoneBook.filter(
        item => item.first_name.toLowerCase().includes(queryL) || item.username.toLowerCase().includes(queryL)
      )
    },
    phoneBookAlphabet(
      state: PhoneBookState,
      { phoneBookFilter }: { phoneBookFilter: UserInfo[] }
    ) {
      let result = [] as any
      ALPHABET.forEach(c => {
        const users = phoneBookFilter
          .filter(user => user.first_name.charAt(0).toLowerCase() === c.toLowerCase())
          .map(item => ({
            id: item.id,
            avatar: item.avatar,
            username: item.username,
            first_name: item.first_name,
            custom_json: item.custom_json,
            type: CHAT_CARD_TYPE.PHONE_BOOK
          }))
        if (users.length) {
          result = result.concat([
            {
              title: c.toLowerCase(),
              type: CHAT_CARD_TYPE.HEADING,
              id: `_${c}`
            },
            ...users
          ])
        }
      })
      console.log(result)
      return result
    }
  }
}
