interface ErrorDescription {
  code: string
  description: string
}

export interface FailureResponse {
  title: string
  status: number
  errors: ErrorDescription[]
}

export interface DefaultResponse<TResponse> {
  isSuccess: boolean
  result?: TResponse
  failure?: FailureResponse
}

export const unknownFailure: FailureResponse = {
  title: 'client-unknown',
  status: 0,
  errors: [
    {
      code: 'client error',
      description: 'something happened...',
    },
  ],
}
