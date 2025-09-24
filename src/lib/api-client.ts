import axios from 'axios'
import { getAccessToken } from './auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Only add token on client side
    if (typeof window !== 'undefined') {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth.accessToken')
        localStorage.removeItem('auth.refreshToken')
        localStorage.removeItem('auth.user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
