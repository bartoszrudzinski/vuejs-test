<script setup lang="ts">
import { ref } from 'vue'
import { fetchUserList } from '@/users/api'
import type { User } from '@/users/typings'
import BaseLoader from '@/base/BaseLoader.vue'

const isLoading = ref(false)
const userList = ref<User[]>([])

const updateUserList = async () => {
  isLoading.value = true
  userList.value = await fetchUserList()
  isLoading.value = false
}

updateUserList()
</script>

<template>
  <section class="user-list-view">
    <h1>User list</h1>

    <div class="user-list-view__content">
      <BaseLoader v-if="isLoading" />
      <table v-else class="user-list-view__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Car count</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.cars.length }}</td>
            <td style="width: 105px">
              <RouterLink :to="{ name: 'userDetails', params: { id: user.id } }">
                Details
              </RouterLink>
              <a href="#">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.user-list-view {
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
