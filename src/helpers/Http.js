import axios from 'axios'
import store from '../store/index'

// const baseUrl = 'http://localhost:8080'
const baseUrl = 'https://antenas-service.azurewebsites.net'

const http = axios.create({
  baseURL: `${baseUrl}/dev`,
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

http.interceptors.request.use(config => {
  const token = store.getters.userToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, Promise.reject)

export default http
