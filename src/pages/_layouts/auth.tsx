import { Quote } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import mikementzer from '@/assets/mike-mentzer.jpg'
import logo from '@/assets/strength-logo.webp'

export default function AuthLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = pathname.split('/').filter((p) => p !== '')

    if (path.length === 1 && path[0] === 'auth') {
      navigate('/auth/sign-in')
    }
  }, [navigate, pathname])

  return (
    <div className="flex h-screen sm:p-8">
      <section className="relative w-full max-sm:hidden">
        <img
          src={mikementzer}
          alt="strong man"
          width={1080}
          height={1080}
          className="h-full w-full rounded-lg object-cover"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2 text-white">
          <img src={logo} alt="tiny rhino" className="z-10 w-10 rounded-lg" />
          <h2 className="text-xl font-bold">Strength</h2>
        </div>

        <div className="absolute bottom-4 z-10 p-4 font-medium text-white">
          <Quote size={28} className="mb-2" />
          <p className="text-lg">
            It is only within the context of having properly developed your mind that you will be able to truly enjoy
            the achievement of your material values, including that of a more muscular body.
          </p>
          <div className="mt-2">
            <p className="font-bold">Mike Mentzer</p>
            <p className="text-sm">IFBB professional bodybuilder, businessman and author</p>
          </div>
        </div>
      </section>

      <section className="relative flex h-full w-full items-center justify-center p-4">
        <img
          src={mikementzer}
          alt="strong man"
          className="absolute left-0 top-0 h-full w-full object-cover sm:hidden"
        />

        <div className="absolute left-4 top-8 flex items-center gap-2 text-white sm:hidden">
          <img src={logo} alt="tiny rhino" className="z-10 w-10 rounded-lg" />
          <h2 className="text-xl font-bold">Strength</h2>
        </div>

        <div className="bottom-0 left-0 z-10 w-full bg-background p-4 max-sm:absolute max-sm:h-4/6 max-sm:rounded-t-2xl sm:mx-auto sm:w-fit">
          <div>
            <p className="text-lg font-bold">Come manage your strength</p>
            <p className="text-sm text-muted-foreground">Register or sign in to get started</p>
          </div>

          <Outlet />
        </div>
      </section>
    </div>
  )
}
