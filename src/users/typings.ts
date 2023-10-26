import type { Car } from '@/cars/typings'

interface BaseUser {
  id: number
  name: string
}

export type User = BaseUser & {
  cars: number[]
}

export type UserDetails = BaseUser & {
  cars: Omit<Car, 'user'>[]
}
