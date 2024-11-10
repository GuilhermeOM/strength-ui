import { api, failureResponseHandler } from '@/lib/axios'

import { DefaultResponse } from '../response-type'

interface UserSendVerificationEmailRequestParams {
  email: string
}

export default async function userSendVerificationEmailRequest({
  email,
}: UserSendVerificationEmailRequestParams): Promise<DefaultResponse<string>> {
  return await api
    .post<string>('/user/send-verification-email', {
      email,
    })
    .then((response) => ({ isSuccess: true, result: response.data }))
    .catch(failureResponseHandler)
}
