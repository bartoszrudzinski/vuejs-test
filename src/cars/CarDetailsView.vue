<script setup lang="ts">
import { ref } from 'vue'
import type { CarDetails } from '@/cars/typings'
import { fetchCarDetails } from '@/cars/api'
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
</script>

<template>
  <section class="car-details-view">
    <h1>Car details</h1>

    <div class="car-details-view__content">
      <BaseLoader v-if="isLoading" />

      <template v-else-if="car">
        <div class="car-details-view__form">
          <label for="id">Id</label>
          <input :value="car.id" name="id" type="number" disabled />

          <label for="make">Make</label>
          <input :value="car.make" name="make" disabled />

          <label for="model">Model</label>
          <input :value="car.model" name="model" disabled />

          <label for="year">Year</label>
          <input :value="car.year" name="year" type="number" disabled />

          <label for="color">Color</label>
          <input :value="car.color" name="color" disabled />

          <label for="user">Owner</label>
          <select name="user" v-model="car.user" disabled>
            <option :value="user" v-for="user in userList" :key="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
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
  }
}
</style>
