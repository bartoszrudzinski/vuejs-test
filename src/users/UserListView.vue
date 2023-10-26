<script setup lang="ts">
import { ref } from 'vue'
import { fetchUserList } from '@/users/api'
import type { User } from '@/users/typings'

const userList = ref<User[]>([])

const updateUserList = async () => {
  userList.value = await fetchUserList()
}

updateUserList()
</script>

<template>
  <section>
    <h1>User list</h1>

    <pre>{{ userList }}</pre>
  </section>
</template>

<style scoped></style>
