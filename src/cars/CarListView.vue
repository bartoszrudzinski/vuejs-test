<script setup lang="ts">
import { ref } from 'vue'
import { fetchCarList } from '@/cars/api'
import type { Car } from '@/cars/typings'
import BaseLoader from '@/base/BaseLoader.vue'

const isLoading = ref(false)
const carList = ref<Car[]>([])

const updateUserList = async () => {
  isLoading.value = true
  carList.value = await fetchCarList()
  isLoading.value = false
}

updateUserList()
</script>

<template>
  <section class="car-list-view">
    <header class="car-list-view__header">
      <h1>Car list</h1>

      <RouterLink :to="{ name: 'carCreate' }"> + Add new </RouterLink>
    </header>

    <div class="car-list-view__content">
      <BaseLoader v-if="isLoading" />
      <table v-else class="car-list-view__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="car in carList" :key="car.id">
            <td>{{ car.id }}</td>
            <td>{{ car.make }}</td>
            <td>{{ car.model }}</td>
            <td style="width: 105px">
              <RouterLink :to="{ name: 'carDetails', params: { id: car.id } }">
                Details
              </RouterLink>
              <RouterLink :to="{ name: 'carDetailsEdit', params: { id: car.id } }">
                Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.car-list-view {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    color: var(--color-heading);
  }

  &__content {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  &__table {
    width: 100%;
    color: var(--color-table-text);
    -webkit-border-horizontal-spacing: 0;
    -webkit-border-vertical-spacing: 0;

    th {
      text-align: left;
      font-weight: 500;
      color: var(--color-table-heading);
    }

    th,
    td {
      height: 40px;
      padding: 0 0.5rem;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>
