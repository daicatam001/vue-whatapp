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
import {UserInfo} from "@/core/models/users";
import {Message} from "@/core/models/messages";

export interface Chat {
    id: number,
    admin: UserInfo,
    people: UserInfo[],
    last_messages: Message,
    title: string,
    created: string
}