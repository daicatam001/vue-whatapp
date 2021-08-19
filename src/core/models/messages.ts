import { UserInfo } from './users'

export interface Message {
  id: string
  sender: UserInfo
  text: string
  attachments: string[]
  created: string
}
