import {AuthRegister} from "@/core/models";
import axios from "axios";
import {PRIVATE_KEY, PROJECT_ID} from "@/core/constants";

class ApiService {
    async register(data: AuthRegister) {
        return axios.post('https://api.chatengine.io/users/', data, {
            headers: {
                'PRIVATE-KEY': PRIVATE_KEY
            }
        })
    }

    async login(username: string, secret: string) {
        return axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'PRIVATE-KEY': PRIVATE_KEY,
                'Project-ID': PROJECT_ID,
                'User-Name': username,
                'User-Secret': secret
            }
        })
    }
}

export default new ApiService();