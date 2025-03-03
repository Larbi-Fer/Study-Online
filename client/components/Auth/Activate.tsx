'use client'

import { activateAction } from '@/actions/auth.actions'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Toast from '@/ui/Toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Activate = () => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) return
    setIsLoading(true)
    const res = await activateAction(code)
    setIsLoading(false)
    if (res.type === 'ERROR') return Toast(res.payload, 'error')
    Toast('Account activated', 'success')
    // router.push('/home')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input label='Code' type="number" placeholder="Enter the code we sent you" name='fullname' value={code} onChange={handleChange} required />
      <Button loading={isLoading} fullWidth>Submit</Button>
    </form>
  )
}

export default Activate