import { getChallengesData } from '@/actions/challenges.action'
import ChallengesList from '@/components/Challenges'
import { getUserData } from '@/lib/serverUtils'
import { redirect } from 'next/navigation'
import React from 'react'

const ChallengesByTopicPage = async ({params}: {params: Promise<{id: string}>}) => {
  const user = (await getUserData())!
  
  if (user.role != 'admin') return redirect('/challenges')

  const id = (await params).id

  // Get chellenges & points
  const data = await getChallengesData(null, id)
  console.log('data:', data);
  
  if (data.message != 'SUCCESS') return (
    <h3>Something wrong</h3>
  )

  return (
    <ChallengesList admin challenges={data.payload.challenges} />
  )
}

export default ChallengesByTopicPage
