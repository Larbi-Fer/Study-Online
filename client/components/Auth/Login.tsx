'use client'

import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Link from 'next/link'
import { loginAction } from '@/actions/auth.actions'
import { useState } from 'react'
import Toast from '@/ui/Toast'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setUser } from '@/lib/features/user'

const Login = () => {
  const [flds, setFlds] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlds({ ...flds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    const response = await loginAction(flds.email, flds.password)
    setIsLoading(false)

    if (response.type === 'ERROR') {
      console.log(response);

      Toast(response.payload, 'error')
      if (response.code === 'INACTIVE_ACCOUNT') {
        dispatch( setUser({ email: flds.email }) )
        return router.push('/activate')
      }
      return
    }
    Toast('Login Success', 'success')
    
    // dispatch( setUser(response.payload) )
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <Input label='Email' type="email" placeholder="example@service.domain" name='email' value={flds.email} onChange={handleChange} required />
      </div>
      <div className="input">
        <Input label='Password' type="password" placeholder="Type Strong Password" name='password' value={flds.password} onChange={handleChange} required />
        <Link href='/reset'>Forgot password?</Link>
      </div>
      <div className="action">
        <Button type='submit' fullWidth loading={isLoading}>Login</Button>
      </div>

      <div>
        You don't have account? <Link href='/signup'>Create account</Link>
      </div>
    </form>
  )
}

export default Login