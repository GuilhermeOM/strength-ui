import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import userRegisterRequest from '@/api/user-register'
import FormInput from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .object({
      one: z.string().min(8, 'Must contain at least 8 characters'),
      two: z.string().min(8, 'Must contain at least 8 characters'),
    })
    .refine(
      (data) => {
        if (data.one && data.two && data.one !== data.two) {
          return false
        }

        return true
      },
      {
        message: 'Password is not equal',
        path: ['two'],
      }
    ),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function submit(formValues: SignUpSchema) {
    const { email, password } = formValues

    setIsLoading(true)
    const register = await userRegisterRequest({
      email,
      password: password.one,
      confirmPassword: password.two,
    })
    setIsLoading(false)

    register.isSuccess
      ? navigate(`/auth/verification?email=${email}`)
      : toast.error(register.failure?.errors[0].description)
  }

  return (
    <form className="w-full rounded-md sm:w-80" onSubmit={handleSubmit(submit)}>
      <div className="my-10 flex flex-col gap-4">
        <FormInput
          register={{ ...register('email') }}
          error={errors.email?.message}
          inputProps={{ type: 'text', placeholder: 'Email' }}
        />
        <FormInput
          register={{ ...register('password.one') }}
          error={errors.password?.one?.message}
          inputProps={{ type: 'password', placeholder: 'Password' }}
        />
        <FormInput
          register={{ ...register('password.two') }}
          error={errors.password?.two?.message}
          inputProps={{ type: 'password', placeholder: 'Repeat your password' }}
        />

        <Label className="flex items-center gap-2">
          <Checkbox />
          Remember me
        </Label>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full" type="submit" disabled={isLoading}>
          Sign up
        </Button>
        <Link to="/auth/sign-in" className="text-sm hover:underline">
          {'Already have an account? '}
          <span className="font-bold">Sign in</span>
        </Link>
      </div>
    </form>
  )
}
