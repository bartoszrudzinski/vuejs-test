<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>App</div>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

nav {
  font-size: 14px;
  text-align: center;
  flex-grow: 1;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  margin-top: 1rem;
}
</style>
