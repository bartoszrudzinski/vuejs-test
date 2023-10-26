import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import { makeServer } from './mocks/miragejs'

const app = createApp(App)

if (import.meta.env.DEV) {
  makeServer()
}

app.use(router)

app.mount('#app')
