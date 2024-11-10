import { api, failureResponseHandler } from '@/lib/axios'

import { DefaultResponse } from '../response-type'

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
    .then((response) => ({ isSuccess: true, result: response.data }))
    .catch(failureResponseHandler)
}
