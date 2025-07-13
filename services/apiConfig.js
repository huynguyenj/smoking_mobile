import {BASE_API_URL} from '@env'
import axios from 'axios'
import { useUserInfoStorage } from '../store/authStore'

const privateApiClient = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
})

const publicApiClient = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
})

// Private request interceptor to attach token
privateApiClient.interceptors.request.use(
  async (config) => {
    const token =  useUserInfoStorage.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Private response interceptor to handle token refresh
privateApiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const errorData = error.response?.data
    console.log('Right here')
    if (errorData.message === 'TOKEN_EXPIRED'){
      const clearAllStorage = useUserInfoStorage.getState().clearAll()
      clearAllStorage()
    }
    return Promise.reject(errorData?.message || 'An error occurred')
  }
)

// Public response interceptor
publicApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response?.data
    return Promise.reject(errorData?.message || 'An error occurred')
  }
)

export const apiService = {
  privateApiClient,
  publicApiClient
}