import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './pages/_layouts/app'
import AuthLayout from './pages/_layouts/auth'
import Home from './pages/app/home'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import Verification from './pages/auth/verification'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/sign-in',
        element: <SignIn />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />,
      },
      {
        path: '/auth/verification',
        element: <Verification />,
      },
    ],
  },
])
