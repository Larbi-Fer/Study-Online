import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Link from 'next/link'
import React from 'react'

const Signup = () => {
  return (
    <>
      <div className="input">
        <Input label='Fullname' type="text" placeholder="Enter your first & last name" name='fullname' required />
      </div>
      <div className="input">
        <Input label='Email' type="email" placeholder="example@service.domain" name='email' required />
      </div>
      <div className="input">
        <Input label='Password' type="password" placeholder="Type Strong Password" name='password' required />
      </div>
      <div className="action">
        <Button type='submit' fullWidth>Sign up</Button>
      </div>

      <div>
        You already have account? <Link href='/login'>Go to login</Link>
      </div>
    </>
  )
}

export default Signup