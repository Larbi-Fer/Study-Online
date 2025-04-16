'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/ui/Button'
import { createReview } from '@/actions/reviews.actions'
import { useAppSelector } from '@/lib/hooks'
import Toast from '@/ui/Toast'
import './style.css'
import Input from '@/ui/Input'
import { Editor } from '@monaco-editor/react'
import Loading from '@/ui/Loading'

const AddReview = () => {
  const [formData, setFormData] = useState({
    subject: '',
    explication: '',
    code: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { userId } = useAppSelector(state => ({ userId: state.user?.id }))

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(e);
    

    try {
      if (!userId) {
        throw new Error('You must be logged in to submit a review')
      }

      const result = await createReview({
        subject: formData.subject,
        explication: formData.explication,
        code: formData.code
      }, userId)

      if (result.message !== 'SUCCESS') {
        throw new Error(result.message || 'Failed to create review')
      }

      router.push('/reviews')
    } catch (err) {
      Toast(err instanceof Error ? err.message : 'An error occurred', 'error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="review-container">
      <form className="review-header" onSubmit={handleSubmit}>
        <h1 className="review-title">Submit New Code Review</h1>
        <Button type="submit"
              disabled={!formData.subject || !formData.explication || !formData.code}
              loading={isSubmitting}
        >Submit Review</Button>
      </form>

      <div className="review-form">
        <div>
          <div className="form-group">
            <Input label='subject' name='subject' value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <Input label='explication' name='explication' value={formData.explication} onChange={handleChange} required multiline />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="code" className="form-label">Code</label>
            <div style={{overflow: 'hidden'}}>
              <Editor
                defaultLanguage='python'
                theme='vs-dark'
                height='calc(100vh - 250px)'
                defaultValue='# Paste your code here...'
                onChange={val => val && setFormData(prev => ({
                  ...prev,
                  code: val
                }))}
                loading={<Loading />}
                options={{
                  minimap: { enabled: false },
                  cursorBlinking: "smooth",
                  smoothScrolling: true,
                  padding: { top: 10 }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddReview
