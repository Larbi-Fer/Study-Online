'use client'

import Input from '@/ui/Input'
import './style.css'
import Button from '@/ui/Button'
import { useState } from 'react'
import Markdown from '@/ui/Markdown'
import { createDiscussion, updateDiscussion } from '@/actions/community.actions'
import { useRouter } from 'next/navigation'

type DiscussionFormProps = {
  type: 'create' | 'edit',
  id?: string,
  userId: string,
  data?: {
    title: string, content: string, tags: string
  }
}

const DiscussionForm = ({type, id, userId, data}: DiscussionFormProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(data || {
    title: '',
    content: '',
    tags: '',
  })
  const [contentType, setContentType] = useState<'text' | 'preview'>('text')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tags = fields.tags.split(',').map(tag => tag.trim())
    setLoading(true)
    try {
      if (type === 'create') {
        const result = await createDiscussion(fields, tags, userId)
        console.log(result)
        if (result.message === 'SUCCESS') router.push(`/community/discussion/${result.payload.id}`)
      } else if (id) {
        const result = await updateDiscussion(id, fields, tags)
        console.log(result)
        if (result.message === 'SUCCESS') router.push(`/community/discussion/${id}`)
      }
    } catch (error) {
      console.error('Failed to submit discussion:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='discussion-form'>
      <h1>Create Discussion</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Title" type="text" id="title" value={fields.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFields({...fields, title: e.target.value})} required />

        <div className="actions">
          <Button type='button' onClick={() => setContentType('text')} transparent={contentType === 'preview'}>Type</Button>
          <Button type='button' onClick={() => setContentType('preview')} transparent={contentType === 'text'}>Preview</Button>
        </div>
        {contentType === 'text' ?
          // @ts-ignore
          <Input multiline label='Content' minRows={10} id="content" value={fields.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFields({...fields, content: e.target.value})} required />
          :
          <Markdown>{fields.content}</Markdown>
        }

        <Input label="Tags" type="text" id="tags" className='tags-input' value={fields.tags} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFields({...fields, tags: e.target.value})} required />

        <Button type="submit" loading={loading}>Submit</Button>
      </form>
    </div>
  )
}

export default DiscussionForm
