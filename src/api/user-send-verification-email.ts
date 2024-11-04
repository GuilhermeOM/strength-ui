import { api, errorHandler, successHandler } from '@/lib/axios'

import { DefaultResponse } from './types/response-type'

interface UserSendVerificationEmailRequestParams {
  email: string
}

export default async function userSendVerificationEmailRequest({
  email,
}: UserSendVerificationEmailRequestParams): Promise<DefaultResponse<string>> {
  return await api.post<string>('/user/send-verification-email', { email }).then(successHandler).catch(errorHandler)
}
