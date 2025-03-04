'use client'

import { searchEmailAction, sendCodeAction, setPasswordAction, verifyCodeAction } from '@/actions/resetPass.action'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import Toast from '@/ui/Toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Reset = ({ changeHigh }: { changeHigh: () => void }) => {
  const [step, setStep] = useState(0)
  const [flds, setFlds] = useState({ email: '', code: '', password: '', cpassword: '', id: '' })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlds({ ...flds, [e.target.name]: e.target.value })
  }

  const changeStep = (step: number) => {
    setStep(step)
    setTimeout(() => changeHigh(), 100)
  }

  const searchEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await searchEmailAction(flds.email)
    setLoading(false)
    if (res?.message == 'EXIST_EMAIL') {
      setFlds({ ...flds, id: res.payload.id })
      changeStep(1)
    } else if (res.message == 'ERROR')
      Toast('something went wrong', 'error')
    else Toast('Email not found', 'error')
  }

  const sendCode = async () => {
    setLoading(true)
    const res = await sendCodeAction(flds.id)

    setLoading(false)
    if (res?.message == 'NEW_OTP_GENERATED')
      return changeStep(2)
    if (res.message == 'ERROR')
      return Toast('something went wrong', 'error')
    Toast('Error sending code', 'error')
  }

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const res = await verifyCodeAction(flds.code, flds.id)
    setLoading(false)

    if (res.message == 'CORRECT_OTP')
      return changeStep(3)
    if (res.message == 'ERROR')
      return Toast('something went wrong', 'error')
    Toast(res.text!, 'error')
  }

  const setPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const res = await setPasswordAction(flds.id, flds.code, flds.password, flds.cpassword)
    setLoading(false)

    if (res.message == 'PASSWORD_RESET') {
      Toast(res.text!, 'success')
      setFlds({ email: '', code: '', password: '', cpassword: '', id: '' })
      setStep(0)
      router.push('/login')
    }
    Toast(res.text!, 'error')
  }

  return (
    <div>

      {step === 0 && (
        <form onSubmit={searchEmail}>
          <div className="input">
            <Input label='email' type="email" placeholder="example@domain.com" name='email' value={flds.email} onChange={handleChange} required />
          </div>
          <div className="action">
            <Button fullWidth loading={loading}>Continue</Button>
          </div>
        </form>
      )}

      {step > 0 && (
        <>
          <div className='email-place'>{flds.email}</div>
          <div className='email-options'>
            <Button disabled={step > 1} loading={loading && step == 1} onClick={sendCode}>Send code</Button>
            <Button disabled={step > 1} transparent onClick={() => changeStep(2)}>I have code</Button>
          </div>
        </>
      )}

      {step > 1 && (
        <form onSubmit={verifyCode}>
          <div className="input">
            <Input label='code' type="text" placeholder="Code" disabled={step > 2} name='code' value={flds.code} onChange={handleChange} required />
          </div>
          <div className="action">
            <Button disabled={step > 2} loading={loading && step == 2} fullWidth>Verify</Button>
          </div>
        </form>
      )}

      {step > 2 && (
        <form onSubmit={setPassword}>
          <div className="input">
            <Input label='password' type="password" placeholder="Password" name='password' value={flds.password} onChange={handleChange} required />
          </div>

          <div className="input">
            <Input label='confirm password' type="password" placeholder="Confirm Password" name='cpassword' value={flds.cpassword} onChange={handleChange} required />
          </div>

          <div className="action">
            <Button loading={loading} fullWidth>Reset</Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Reset