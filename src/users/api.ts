import type { User, UserDetails } from '@/users/typings'

const BASE_URL = '/api/users'

export const fetchUserList = async (): Promise<User[]> => {
  const response = await fetch(BASE_URL)
  return await response.json()
}

export const fetchUserDetails = async (userId: number): Promise<UserDetails> => {
  const response = await fetch(`${BASE_URL}/${userId}`)
  return await response.json()
}
