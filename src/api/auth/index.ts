import {AuthRegister} from "@/core/models";
import axios from "axios";
import {PRIVATE_KEY, PROJECT_ID, SERVER_URL} from "@/core/constants";


export async function register(data: AuthRegister) {
    return axios.post(`${SERVER_URL}/users`, data)
}

export async function login(username: string, secret: string) {
    return axios.get(`${SERVER_URL}/users/me`, {
        headers: {
            'PRIVATE-KEY': PRIVATE_KEY,
            'Project-ID': PROJECT_ID,
            'User-Name': username,
            'User-Secret': secret
        }
    })
}

