import axios from 'axios';

const instance = axios.create({
    baseURL: "https://bestrong-api.up.railway.app/api", 
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use(function (config) {
    let accessToken = sessionStorage.getItem('accessToken');
    if(accessToken) {
        config.headers.Authorization =  `Bearer ${accessToken}`;
    }
    return config;
});

export default instance;
