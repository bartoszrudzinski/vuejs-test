<script setup lang="ts">
import { ref } from 'vue'
import type { CarDetails } from '@/cars/typings'
import { fetchCarDetails, updateCar } from '@/cars/api'
import BaseLoader from '@/base/BaseLoader.vue'
import type { User } from '@/users/typings'
import { fetchUserList } from '@/users/api'

const props = defineProps<{
  id: number
}>()

const isLoading = ref(false)
const car = ref<CarDetails>()
const userList = ref<Omit<User, 'cars'>[]>([])

const updateUserList = async () => {
  const users = await fetchUserList()
  userList.value = users.map((user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cars, ...userWithoutCars } = user
    return userWithoutCars
  })
}

const updateCarDetails = async () => {
  isLoading.value = true
  car.value = await fetchCarDetails(props.id)
  isLoading.value = false
}

updateCarDetails()
updateUserList()

const save = async () => {
  isLoading.value = true
  updateCar({
    ...car.value!,
    user: car.value!.user.id
  })
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
          <label for="id">Id</label>
          <input :value="car.id" name="id" type="number" disabled />

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
