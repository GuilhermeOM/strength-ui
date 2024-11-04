import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="relative flex h-fit w-screen max-w-2xl flex-col px-4 sm:mx-auto">{children}</div>
}
