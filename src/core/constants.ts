export const ENVIRONMENT = process.env.NODE_ENV

export const PROJECT_ID =  process.env.VUE_APP_CHAT_ENGINE_PROJECT_ID || '07be9561-163e-42a3-9ba9-4e056837fe04'

export const PRIVATE_KEY = process.env.VUE_APP_CHAT_ENGIN_PRIVATE_KEY || '0b611334-6a16-406e-82d6-cd2cd59a1655'

export const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'https://api.chatengine.io'

export const DEFAULT_USERNAME = process.env.VUE_APP_DEFAULT_USERNAME || '123456789'

export const DEFAULT_PASSWORD = process.env.VUE_APP_DEFAULT_PASSWORD || '123456'

export enum LOAD_STATE {
  UNLOAD,
  LOADING_LATEST,
  LOADED
  // LOADING_MORE
}

export enum SEND_STATE {
  SENDING = 'SENDING',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  SEEN = 'SEEN'
}

export enum MESSAGE_TYPE {
  MESSAGE = 'MESSAGE',
  NOTIFICATION = 'NOTIFICATION'
}
export enum NOTIFY_TYPE {
  CREATE_GROUP = 'CREATE_GROUP',
  LEAVE_GROUP = 'LEAVE_GROUP',
  ADD_MEMBER = 'ADD_MEMBER',
  TIMELINE = 'TIMELINE'
}

export enum CHAT_CARD_TYPE {
  CONVO = 'CONVO',
  HEADING = 'HEADING',
  PHONE_BOOK = 'PHONE_BOOK'
}

export enum CHAT_TYPE {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP'
}

export const ALPHABET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]
