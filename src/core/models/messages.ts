import { UserInfo } from './users'

export type Message = {
  id: number
  sender: UserInfo
  text: string
  sender_username: string
  attachments: string[]
  custom_json: any
  created: string
}

export interface MessageCreate {
  text?: string
  attachment_urls?: string[]
  sender_username: string
  custom_json?: any
}
