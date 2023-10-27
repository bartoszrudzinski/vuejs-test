import type { Car, CarDetails } from '@/cars/typings'

const BASE_URL = '/api/cars'

export const fetchCarList = async (): Promise<Car[]> => {
  const response = await fetch(BASE_URL)
  return await response.json()
}

export const fetchCarDetails = async (carId: number): Promise<CarDetails> => {
  const response = await fetch(`${BASE_URL}/${carId}`)
  return await response.json()
}
