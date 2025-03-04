'use client'
import { signupAction } from '@/actions/auth.actions'
import { setUser } from '@/lib/features/user'
import { useAppDispatch } from '@/lib/hooks'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Toast from '@/ui/Toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Signup = () => {
  const [flds, setFlds] = useState({ fullname: '', email: '', password: '' })
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
    const res = await signupAction(flds.fullname, flds.email, flds.password)
    setIsLoading(false)
    if (res.type === 'ERROR') return Toast(res.payload, 'error')
    Toast('Register Success', 'success')
    dispatch(setUser(res.payload))
    router.push('/activate')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <Input 
          label='Fullname' 
          type="text" 
          placeholder="Enter your first & last name" 
          name='fullname' 
          value={flds.fullname} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="input">
        <Input 
          label='Email' 
          type="email" 
          placeholder="example@service.domain" 
          name='email' 
          value={flds.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="input">
        <Input 
          label='Password' 
          type="password" 
          placeholder="Type Strong Password" 
          name='password' 
          value={flds.password} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="action">
        <Button type='submit' fullWidth loading={isLoading}>Sign up</Button>
      </div>

      <div>
        You already have account? <Link href='/login'>Go to login</Link>
      </div>
    </form>
  )
}

export default Signup