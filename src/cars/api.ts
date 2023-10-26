import type { Car } from '@/cars/typings'

const BASE_URL = '/api/cars'

export const fetchCarList = async (): Promise<Car[]> => {
  const response = await fetch(BASE_URL)
  return await response.json()
}
