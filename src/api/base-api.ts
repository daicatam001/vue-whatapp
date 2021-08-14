import axios from 'axios'
import store from '@/store'
import {PRIVATE_KEY, PROJECT_ID, SERVER_URL} from "@/core/constants";

const baseApi = axios.create({
    baseURL: SERVER_URL
})

baseApi.interceptors.request.use(config => {
    const headers = {
        'PRIVATE-KEY': PRIVATE_KEY,
    }
    const userInfo = store.getters['auth/userInfo']
    if (userInfo) {
        Object.assign(headers, {
            'Project-ID': PROJECT_ID,
            'User-Name': userInfo.username,
            'User-Secret': userInfo.secret
        })
    }
    Object.assign(config.headers, headers)
    return config
})

export default baseApi;