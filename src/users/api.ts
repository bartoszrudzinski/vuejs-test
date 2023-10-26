import type { User } from '@/users/typings'

const BASE_URL = 'api/users'

export const fetchUserList = async (): Promise<User[]> => {
  const response = await fetch(BASE_URL)
  return await response.json()
}
