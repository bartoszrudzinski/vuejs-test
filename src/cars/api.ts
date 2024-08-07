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

export const createCar = async (car: Omit<Car, 'id'>) => {
  const response = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(car) })
  return await response.json()
}

export const updateCar = async (car: Car) => {
  const response = await fetch(BASE_URL, { method: 'PUT', body: JSON.stringify(car) })
  return await response.json()
}
