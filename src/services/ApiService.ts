import {AuthRegister} from "@/core/models";
import axios from "axios";
import {PRIVATE_KEY} from "@/core/constants";

class ApiService{
    async register(data:AuthRegister){
        return axios.post('https://api.chatengine.io/users/',data,{
            headers:{
                'PRIVATE-KEY':PRIVATE_KEY
            }
        })
    }
}

export default new ApiService();