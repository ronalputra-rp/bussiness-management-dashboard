import axios from 'axios'


const getToken = localStorage.getItem("token");

const api = axios.create({
    baseURL:'https://localhost:8000',
    timeout:8000,
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${getToken}`
    }
})

export default api;