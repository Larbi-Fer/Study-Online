import { getUserFromCookies } from '@/actions/auth.actions';
import { getDashboardData } from '@/actions/dashboard.actions';
import Dash from '@/components/dashboard'
import { getUserData } from '@/lib/serverUtils';
import { cookies } from 'next/headers'

const Dashboard = async() => {
  let user = (await getUserData())!

  const data = await getDashboardData(user.id!, user.selectedTopic?.id!)

  if (data.message != 'SUCCESS') return (
    <h2>Something went wrong</h2>
  )

  return (
    <Dash data={data.payload} level={user.level} />
  )
}

export default Dashboard