import AuthGuard from '@/utils/routeGuard/AuthGuard'
import React, { ReactElement } from 'react'

const AuthLayout = ({children} : {children: ReactElement}) => {
  return (
    <AuthGuard>{children}</AuthGuard>
  )
}

export default AuthLayout
