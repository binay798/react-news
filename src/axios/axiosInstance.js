import axios from 'axios'


const instance = axios.create({
    baseURL: `https://newsapi.org/v2/`
})

export const backendApi = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
})

export default instance