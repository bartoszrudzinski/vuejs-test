import type { User } from '@/users/typings'

export type Car = {
  id: number
  make: string
  model: string
  year: number
  color: string
  user: number
}

export type CarDetails = {
  id: number
  make: string
  model: string
  year: number
  color: string
  user: Omit<User, 'cars'>
}
