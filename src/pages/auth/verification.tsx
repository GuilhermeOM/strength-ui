import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import userSendVerificationEmailRequest from '@/api/user/user-send-verification-email'

export default function Verification() {
  const [searchParams] = useSearchParams()

  async function resendEmail() {
    const email = searchParams.get('email') ?? ''
    const response = await userSendVerificationEmailRequest({ email })

    response.isSuccess ? toast.success(response.result) : toast.error('Error sending the verification')
  }

  return (
    <div className="w-full rounded-md sm:w-80">
      <p className="mt-4 text-sm">An email with a verification link was sent!</p>

      <div className="my-8 flex flex-wrap gap-2 text-xs">
        <Link to="/auth/sign-in" className="text-sm hover:underline">
          Go to <span className="font-bold">sign in page.</span>
        </Link>
        <p className="cursor-pointer text-sm hover:underline" onClick={resendEmail}>
          No email received? <span className="font-bold">Click here to resend.</span>
        </p>
      </div>
    </div>
  )
}
