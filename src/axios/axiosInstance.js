import axios from 'axios'


const instance = axios.create({
    baseURL: `https://newsapi.org/v2/`
})

export const backendApi = axios.create({
    withCredentials: true,
    baseURL: 'https://react-news-backend.herokuapp.com/',
})

export default instance