import store from '@/store'
import {PROJECT_ID} from "@/core/constants";


export function setupSocket() {
    const username = store.getters['auth/username']
    const secret = store.getters['auth/secret']
    const conn = new WebSocket(`wss://api.chatengine.io/person/?publicKey=${{PROJECT_ID}}&username=${{username}}&secret=${{secret}}`)

    conn.onopen = (event) => {
        console.log('connect success', event)
    }
    conn.onmessage = (event) => {
        console.log('onmessage', event)
    }
}