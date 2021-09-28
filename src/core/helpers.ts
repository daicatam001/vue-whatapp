import moment from 'moment'
import { NOTIFY_TYPE } from './constants'
import i18n from './i18n'
import { Chat } from './models/chats'
import { Message } from './models/messages'

function elementInViewport(el) {
  let top = el.offsetTop
  let left = el.offsetLeft
  const width = el.offsetWidth
  const height = el.offsetHeight

  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  )
}

export function timelineFormat(date: string) {
  const lastSent = moment(date)
  const diff = moment().diff(lastSent, 'day')
  if (diff > 7) {
    return lastSent.format('DD-MM-YYYY')
  } else if (diff >= 1) {
    return lastSent.format('dddd')
  } else {
    return moment(date).format('hh:mm')
  }
}

export function formatChat(chat: Chat) {
  const formatedChat = { ...chat } as Chat
  if (formatedChat.custom_json) {
    formatedChat.custom_json = JSON.parse(formatedChat.custom_json)
  }
  if (formatedChat.last_message && formatedChat.last_message.custom_json) {
    formatedChat.last_message.custom_json = JSON.parse(
      formatedChat.last_message.custom_json
    )
  }
  formatedChat.people.forEach(item => {
    if (item.person.custom_json) {
      item.person.custom_json = JSON.parse(item.person.custom_json as string)
    }
  })
  return formatedChat
}

export function notifyMessage(notify: Message, chat: Chat, username: string) {
  let admin, creater, invitee
  switch (notify.custom_json.notify) {
    case NOTIFY_TYPE.CREATE_GROUP:
      admin = chat.people.filter(
        item => item.person.username === chat.admin.username
      )[0]
      return i18n.global.t(
        chat.admin.username === username
          ? 'youCreatedGroup'
          : 'adminCreatedGroup',
        {
          group: chat.title,
          admin: admin ? admin.person.first_name : chat.admin.username
        }
      )
    case NOTIFY_TYPE.ADD_MEMBER:
      invitee = chat.people.filter(
        item => item.person.username === notify.custom_json.member
      )[0]
      creater = chat.people.filter(
        item => item.person.username === notify.sender_username
      )[0]
      return i18n.global.t(
        notify.sender_username === username
          ? 'youInvitedPerson'
          : notify.custom_json.member === username
          ? 'youWereInvited'
          : 'invitedSomeone',
        {
          invitee: invitee ? invitee.person.first_name : notify.custom_json.member,
          inviter: creater ?  creater.person.first_name : notify.sender_username
        }
      )
    case NOTIFY_TYPE.LEAVE_GROUP: {
      creater = chat.people.filter(
        item => item.person.username === notify.sender_username
      )[0]
      return i18n.global.t(
        notify.sender_username === username
          ? 'youLeftGroup'
          : 'personLeftGroup',
        {
          person: creater ? creater.person.first_name : notify.sender_username
        }
      )
    }
  }
  return ''
}
