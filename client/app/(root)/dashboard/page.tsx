import { getDashboardData } from '@/actions/dashboard.actions';
import Dash from '@/components/dashboard'
import { cookies } from 'next/headers'

const Dashboard = async() => {
  const user = JSON.parse((await cookies()).get('user')?.value!)
  
  const data = await getDashboardData(user.id, user.lesson.topicId)
  
  if (data.message != 'SUCCESS') return (
    <h2>Something went wrong</h2>
  )

  return (
    <Dash data={data.payload} />
  )
}

export default Dashboard