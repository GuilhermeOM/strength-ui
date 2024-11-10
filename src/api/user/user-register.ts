import { api, failureResponseHandler } from '@/lib/axios'

import { DefaultResponse } from '../response-type'

interface UserRegisterRequestParams {
  email: string
  password: string
  confirmPassword: string
}

export default async function userRegisterRequest({
  email,
  password,
  confirmPassword,
}: UserRegisterRequestParams): Promise<DefaultResponse<string>> {
  return await api
    .post<string>('/user/register', {
      email,
      password,
      confirmPassword,
    })
    .then((response) => ({ isSuccess: true, result: response.data }))
    .catch(failureResponseHandler)
}
