import { UserInfo } from './users'

export interface Message {
  id: string
  sender: UserInfo
  text: string
  sender_username: string
  attachments: string[]
  custom_json: {
    [key: string]: string
  }
  created: string
}

export interface MessageCreate {
  text?: string
  attachment_urls?: string[]
  custom_json?: {
    [key: string]: string
  }
}
