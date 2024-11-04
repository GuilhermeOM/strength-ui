import { zodResolver } from '@hookform/resolvers/zod'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import userLoginRequest from '@/api/user-login'
import FormCheckbox from '@/components/form/form-checkbox'
import FormInput from '@/components/form/form-input'
import { Button } from '@/components/ui/button'

const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  remember: z.custom<CheckedState>().transform((data) => {
    if (!data || data === 'indeterminate') {
      return false
    }

    return data
  }),
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  async function submit(formValues: SignInSchema) {
    const { email, password } = formValues

    const login = await userLoginRequest({ email, password })

    login.isSuccess ? toast.success(login.result?.token) : toast.error(login.failure?.errors[0].description)
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
        <Button className="w-full" type="submit">
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
