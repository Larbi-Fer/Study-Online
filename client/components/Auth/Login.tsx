import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <>
      <div className="input">
        <Input label='Email' type="email" placeholder="example@service.domain" name='email' required />
      </div>
      <div className="input">
        <Input label='Password' type="password" placeholder="Type Strong Password" name='password' required />
      </div>
      <div className="action">
        <Button type='submit' fullWidth>Login</Button>
      </div>

      <div>
        You don't have account? <Link href='/signup'>Create account</Link>
      </div>
    </>
  )
}

export default Login