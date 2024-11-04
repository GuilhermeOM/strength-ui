import axios, { AxiosError, AxiosResponse } from 'axios'

import { DefaultResponse, FailureResponse, unknownFailure } from '@/api/types/response-type'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

function isAxiosError<TResponse>(error: unknown): error is AxiosError<TResponse> {
  return axios.isAxiosError(error)
}

export function errorHandler(error: unknown) {
  return isAxiosError<FailureResponse>(error) && error.response
    ? { isSuccess: false, failure: error.response.data }
    : { isSuccess: false, failure: unknownFailure }
}

export function successHandler<TResponse>(response: AxiosResponse<TResponse>): DefaultResponse<TResponse> {
  return { isSuccess: true, result: response.data }
}

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 3000)))
    return config
  })
}
