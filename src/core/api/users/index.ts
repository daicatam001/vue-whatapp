import baseApi from '@/core/api/base-api'
import { UserInfo } from '@/core/models/users'

export async function getUsers(): Promise<{ data: UserInfo[] }> {
  return baseApi.get(`/users`)
}

