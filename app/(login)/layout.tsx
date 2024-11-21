import LoginGuard from '@/utils/routeGuard/LoginGuard'
import React, { ReactElement } from 'react'

const LoginLayout = ({children} : {children: ReactElement}) => {
  return (
    <LoginGuard>{children}</LoginGuard>
  )
}

export default LoginLayout
