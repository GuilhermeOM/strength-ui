import { api, errorHandler, successHandler } from '@/lib/axios'

import { DefaultResponse } from './types/response-type'

interface UserLoginRequestParams {
  email: string
  password: string
}

interface UserLogin {
  tokenType: string
  token: string
  expiresAt: string
}

export default async function userLoginRequest({
  email,
  password,
}: UserLoginRequestParams): Promise<DefaultResponse<UserLogin>> {
  return await api
    .post<UserLogin>('/user/login', {
      email,
      password,
    })
    .then(successHandler)
    .catch(errorHandler)
}
