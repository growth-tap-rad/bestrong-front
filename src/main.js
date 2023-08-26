import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueTheMask from 'vue-the-mask'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueTheMask)
app.use(createPinia())
app.use(router)

app.mount('#app')
