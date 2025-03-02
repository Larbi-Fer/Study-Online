'use client'

import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Link from 'next/link'
import { loginAction } from '@/actions/auth.actions'
import { useEffect, useState } from 'react'
import Toast from '@/ui/Toast'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [flds, setFlds] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlds({ ...flds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    const response = await loginAction(flds.email, flds.password)
    setIsLoading(false)
    if (response.type === 'ERROR') return Toast(response.payload, 'error')
    Toast('Login Success', 'success')
    router.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <Input label='Email' type="email" placeholder="example@service.domain" name='email' value={flds.email} onChange={handleChange} required />
      </div>
      <div className="input">
        <Input label='Password' type="password" placeholder="Type Strong Password" name='password' value={flds.password} onChange={handleChange} required />
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