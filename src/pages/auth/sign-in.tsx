import { zodResolver } from '@hookform/resolvers/zod'
import { CheckedState } from '@radix-ui/react-checkbox'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { RESPONSE_CODES } from '@/api/response-code'
import { FailureResponse } from '@/api/response-type'
import userLoginRequest from '@/api/user/user-login'
import userSendVerificationEmailRequest from '@/api/user/user-send-verification-email'
import FormCheckbox from '@/components/form/form-checkbox'
import FormInput from '@/components/form/form-input'
import { Button } from '@/components/ui/button'

const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  remember: z.custom<CheckedState>().transform((data) => (!data || data === 'indeterminate' ? false : data)),
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const navigate = useNavigate()

  async function submit(formValues: SignInSchema) {
    const { email, password } = formValues

    const signin = await userLoginRequest({ email, password })

    signin.isSuccess ? handleSigninSuccess(signin.result?.token) : handleSigninFailure(email, signin.failure!)
  }

  function handleSigninSuccess(token: string | undefined) {
    if (!token) return

    Cookies.set('token', token, { expires: 7, secure: true })
    navigate('/')
  }

  function handleSigninFailure(email: string, failure: FailureResponse) {
    if (failure.errors.length === 0) return

    const error = failure.errors[0]

    const requestVerificationAction = {
      label: 'request verification',
      onClick: () => requestVerificationEmail(email),
    }

    error.code === RESPONSE_CODES.USER_NOT_VERIFIED
      ? toast.error(error.description, { action: requestVerificationAction })
      : toast.error(error.description)
  }

  async function requestVerificationEmail(email: string) {
    const response = await userSendVerificationEmailRequest({ email })

    response.isSuccess ? toast.success(response.result) : toast.error('error sending the verification')
  }

  return (
    <form className="w-full rounded-md sm:w-80" onSubmit={handleSubmit(submit)}>
      <div className="my-10 flex flex-col gap-4">
        <FormInput
          register={{ ...register('email') }}
          error={errors.email?.message}
          inputProps={{
            type: 'text',
            placeholder: 'Email',
          }}
        />
        <FormInput
          register={{ ...register('password') }}
          error={errors.password?.message}
          inputProps={{
            type: 'password',
            placeholder: 'Password',
          }}
        />

        <FormCheckbox name="remember" control={control} label="Remember me" defaultValue={true} />
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
        <Link to="/auth/sign-up" className="text-sm hover:underline">
          {"Don't have an account? "}
          <span className="font-bold">Sign up for free</span>
        </Link>
      </div>
    </form>
  )
}
