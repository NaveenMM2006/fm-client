import axios from 'axios';

const API = axios.create({
    baseURL:
    'https://fm-server-2krr.onrender.com',
});


export default API;