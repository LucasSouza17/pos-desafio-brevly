import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  validateStatus: (status) => status >= 200 && status < 500,
})