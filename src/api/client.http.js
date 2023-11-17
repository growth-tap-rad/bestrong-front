import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(function (config) {
  let accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

instance.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if(error.response.status === 401){
    sessionStorage.removeItem('accessToken');
    await window.router.push('/')
  }
  return Promise.reject(error);
});

export default instance
