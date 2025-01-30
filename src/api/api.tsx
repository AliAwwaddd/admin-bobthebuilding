import { auth } from '@/auth'
import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean // Add the custom property globally
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    if (config?.skipAuth) {
      return config
    }

    const session = await auth()
    const accessToken = session?.user?.access_token

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // return error.response.data
    const errorMessage = error.response?.data?.error || 'Something went wrong'
    const errorDetails =
      error.response?.data?.details || 'No additional details'
    return `${errorMessage}: ${errorDetails}`
  } else {
    return 'An unexpected error occurred.'
  }
}

export const apiRequest = async (
  requestCallback: () => Promise<{ data: any }>,
) => {
  try {
    const response = await requestCallback()
    return { data: response.data, error: null }
  } catch (error) {
    // console.log('error', error)
    const handledError = handleApiError(error)
    return { data: null, error: handledError }
  }
}

export default api
