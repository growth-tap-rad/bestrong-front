import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css';
import VueTheMask from 'vue-the-mask'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(VueTheMask)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) 
app.mount('#app')
