import { AuthRegister, UserInfo } from '@/core/models/users'
import { PRIVATE_KEY, PROJECT_ID } from '@/core/constants'
import baseApi from '@/api/base-api'

export async function register(
  data: AuthRegister
): Promise<{ data: UserInfo }> {
  return baseApi.post(`/users`, data)
}

export async function login(
  username: string,
  secret: string
): Promise<{ data: UserInfo }> {
  return baseApi.get(`/users/me`, {
    headers: {
      'PRIVATE-KEY': PRIVATE_KEY,
      'Project-ID': PROJECT_ID,
      'User-Name': username,
      'User-Secret': secret
    }
  })
}
