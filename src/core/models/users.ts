export interface AuthRegister {
  username: string
  first_name: string
  last_name: string
  secret: string
}

export interface UserInfo {
  id: number
  username: string
  email: string
  secret?: string
  custom_json: {
    [key: string]: any
  } | string
  first_name: string
  last_name: string
  avatar: string
  is_online: boolean

}

export interface AuthLogin {
  username: string
  secret: string
}
