'use client'

import { activateAction } from '@/actions/auth.actions'
import { setUser } from '@/lib/features/user'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Toast from '@/ui/Toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Activate = ({isActive}: {isActive: boolean}) => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const email = useAppSelector(state => state.user?.email)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    if (email || !isActive) return
    Toast('Please login first', 'warning')
    router.push('/login')
  }, [isActive])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) return
    setIsLoading(true)
    const res = await activateAction(code, email!)
    setIsLoading(false)

    if (res.type === 'ERROR') return Toast(res.payload, 'error')
    Toast('Account activated', 'success')

    dispatch(setUser(res.payload))
    router.push('/home')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Enter the 6-digit code we sent to your email</p>
      <Input label='Code' type="number" placeholder="Enter the code we sent you" name='fullname' value={code} onChange={handleChange} required />
      <Button loading={isLoading} fullWidth>Submit</Button>
    </form>
  )
}

export default Activate