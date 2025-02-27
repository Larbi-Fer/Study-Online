import AuthForm from '@/components/Auth/AuthForm';
import React from 'react'

const AuthLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AuthForm />
    </div>
  )
}

export default AuthLayout