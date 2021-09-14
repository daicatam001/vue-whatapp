// [
//     {
//         "id": 237,
//         "admin": {
//             "username": "wendy_walker",
//             "first_name": null,
//             "last_name": null,
//             "avatar": null,
//             "is_online": false
//         },
//         "people": [
//             {
//                 "person": {
//                     "username": "wendy_walker",
//                     "first_name": null,
//                     "last_name": null,
//                     "avatar": null,
//                     "is_online": false
//                 },
//                 "last_read": null
//             }
//         ],
//         "attachments": [],
//         "last_message": {
//             "created": "",
//             "attachments": [],
//             "text": ""
//         },
//         "title": "Chess Club",
//         "created": "2021-01-28T02:41:48.826706Z"
//     }
// ]
import { UserInfo } from './users'
import { Message } from './messages'

export interface UserChat {
  last_read?: string
  chat_updated?:string
  person: UserInfo
}
export interface Chat {
  id: number | string
  admin: UserInfo
  people: UserChat[]
  last_message: Message
  title: string
  created: string
  is_direct_chat: boolean
  isHeading?: boolean
}
