import { getDiscussionDetails } from '@/actions/community.actions'
import DiscussionForm from '@/components/Community/Discussion/DiscussionForm'
import { getUserData } from '@/lib/serverUtils'

import { notFound, redirect } from 'next/navigation'
import React from 'react'

const EditDiscussionPage = async({params}: {params: Promise<{id: string}>}) => {
  const user = await getUserData()
  const { id } = await params

  if (!user) redirect('/community')

  const data = await getDiscussionDetails(id)
  if (data.message !== 'SUCCESS') redirect('/community')
  if (!data.payload) notFound()
  if (data.payload.userId !== user.id) redirect('/community/discussion/' + id)

  data.payload.tags = data.payload.tags.join(',')

  return (
    <DiscussionForm type='edit' id={id} userId={user.id!} data={data.payload} />
  )
}

export default EditDiscussionPage
