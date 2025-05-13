'use client'

import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { useState } from 'react'
import './style.css'
import Toast from '@/ui/Toast'
import { createReviewer } from '@/actions/user.action'

const AdminDashboard = () => {
  const [fields, setFields] = useState({ email: '', fullname: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const result = await createReviewer(fields.email, fields.fullname, fields.password)
    
    if (result.message !== 'SUCCESS') {
      Toast(result.viewMessage || 'Failed to create reviewer', 'error')
      setLoading(false)
      return
    }
    
    setLoading(false)
    setFields({ email: '', fullname: '', password: '' })
    Toast('Successful creation', 'success')
  }

  return (
    <div className='admin-container'>
      <h2>Create a code reviewer</h2>
      <form onSubmit={handleSubmit} className='admin-form'>
        <Input label='email' value={fields.email} onChange={handleChange} name='email' required />
        <Input label='fullname' value={fields.fullname} onChange={handleChange} name='fullname' required />
        <Input label='password' value={fields.password} onChange={handleChange} name='password' required type='password' />

        <div style={{padding: '10px'}}>
          <Button fullWidth loading={loading}>Create</Button>
        </div>
      </form>
    </div>
  )
}

export default AdminDashboard
