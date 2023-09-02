import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueTheMask from 'vue-the-mask'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueTheMask)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) 
app.mount('#app')
