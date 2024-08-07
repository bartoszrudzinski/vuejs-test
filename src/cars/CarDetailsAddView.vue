<script setup lang="ts">
import { ref } from 'vue'
import BaseLoader from '@/base/BaseLoader.vue'
import type { User } from '@/users/typings'
import { fetchUserList } from '@/users/api'
import { createCar } from '@/cars/api'

type CarDetailsNew = {
  id: number | null
  make: string
  model: string
  year: string | number
  color: string
  user: Omit<User, 'cars'> | null
}

const isLoading = ref(false)
const car = ref<CarDetailsNew>({
  id: null,
  make: '',
  model: '',
  year: '',
  color: '',
  user: null
})
const userList = ref<Omit<User, 'cars'>[]>([])

const updateUserList = async () => {
  const users = await fetchUserList()
  userList.value = users.map((user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cars, ...userWithoutCars } = user
    return userWithoutCars
  })
}

updateUserList()

const save = async () => {
  if (!car.value.user) return

  isLoading.value = true
  const newCar = await createCar({
    ...car.value,
    year: typeof car.value.year === 'string' ? parseInt(car.value.year) : car.value.year,
    user: car.value.user?.id
  })
  car.value.id = newCar.id
  isLoading.value = false
}
</script>

<template>
  <section class="car-details-view">
    <h1>Car details</h1>

    <div class="car-details-view__content">
      <BaseLoader v-if="isLoading" />

      <template v-else-if="car">
        <form @submit.prevent="save" class="car-details-view__form">
          <template v-if="car.id">
            <label for="id">Id</label>
            <input v-model="car.id" name="id" disabled />
          </template>

          <label for="make">Make</label>
          <input v-model="car.make" name="make" />

          <label for="model">Model</label>
          <input v-model="car.model" name="model" />

          <label for="year">Year</label>
          <input v-model="car.year" name="year" type="number" />

          <label for="color">Color</label>
          <input v-model="car.color" name="color" />

          <label for="user">Owner</label>
          <select name="user" v-model="car.user">
            <option :value="user" v-for="user in userList" :key="user.id">
              {{ user.name }}
            </option>
          </select>

          <div class="car-details-view__form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </template>
    </div>
  </section>
</template>

<style scoped>
.car-details-view {
  h1,
  h2 {
    color: var(--color-heading);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  &__form {
    display: grid;
    grid-template-columns: 100px 200px;
    gap: 0.5rem;
    margin-bottom: 2rem;

    label {
      text-align: right;
      font-weight: 500;
      color: var(--color-table-heading);
    }

    &-actions {
      text-align: right;
      grid-column-end: span 2;
    }
  }
}
</style>
