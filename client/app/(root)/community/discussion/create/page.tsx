import DiscussionForm from '@/components/Community/Discussion/DiscussionForm'
import { getUserData } from '@/lib/serverUtils'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateDiscussionPage = async() => {
  const user = await getUserData()

  if (!user) redirect('/community')

  return (
    <DiscussionForm type='create' userId={user.id!} />
  )
}

export default CreateDiscussionPage
