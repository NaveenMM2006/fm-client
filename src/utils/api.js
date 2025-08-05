import axios from 'axios';

const API = axios.create({
    baseURL:
    'https://fm-server-2krr.onrender.com/api',
});


export default API;