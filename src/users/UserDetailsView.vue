<script setup lang="ts">
import { ref } from 'vue'
import type { UserDetails } from '@/users/typings'
import { fetchUserDetails } from '@/users/api'
import BaseLoader from '@/base/BaseLoader.vue'

const props = defineProps<{
  id: number
}>()

const isLoading = ref(false)
const user = ref<UserDetails>()

const updateUserDetails = async () => {
  isLoading.value = true
  user.value = await fetchUserDetails(props.id)
  isLoading.value = false
}

updateUserDetails()
</script>

<template>
  <section class="user-details-view">
    <h1>User details</h1>

    <div class="user-details-view__content">
      <BaseLoader v-if="isLoading" />

      <template v-else-if="user">
        <div class="user-details-view__form">
          <label for="id">Id</label>
          <input :value="user.id" name="id" disabled />

          <label for="name">Name</label>
          <input :value="user.name" name="name" disabled />
        </div>

        <h2>Cars</h2>
        <ul>
          <li v-for="car in user.cars" :key="car.id">
            {{ car.color }} <strong>{{ car.make }} {{ car.model }}</strong
            >, {{ car.year }}
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<style scoped>
.user-details-view {
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
