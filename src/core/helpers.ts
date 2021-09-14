import moment from 'moment'
import { Chat } from './models/chats'

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
  const formatedChat = {...chat}
  if (formatedChat.last_message && formatedChat.last_message.custom_json) {
    formatedChat.last_message.custom_json = JSON.parse(formatedChat.last_message.custom_json)
  }
  formatedChat.people.forEach(item => {
    if (item.person.custom_json) {
      item.person.custom_json = JSON.parse(item.person.custom_json as string)
    }
  })
  return formatedChat
}
