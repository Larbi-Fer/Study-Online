import AuthForm from '@/components/Auth/AuthForm';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const AuthLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userId = (await cookies()).get('userId');
  if (userId) return redirect('/dashboard');
  return (
    <div>
      <AuthForm />
    </div>
  )
}

export default AuthLayout