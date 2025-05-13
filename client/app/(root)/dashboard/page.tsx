import { getDashboardData } from '@/actions/dashboard.actions';
import Dash from '@/components/dashboard'
import { getUserData } from '@/lib/serverUtils';
import AdminDashboard from '../../../components/dashboard/Admin';

const Dashboard = async() => {
  let user = (await getUserData())!

  if (user.role === 'code_reviewer') {
    return (
      <div>
        <h1>Code Reviewer Dashboard</h1>
      </div>
    )
  }

  if (user.role === 'admin') {
    return (
      <AdminDashboard />
    )
  }

  const data = await getDashboardData(user.id!, user.selectedTopic?.id!)

  if (data.message != 'SUCCESS') return (
    <h2>Something went wrong</h2>
  )

  return (
    <Dash data={data.payload} level={user.level} />
  )
}

export default Dashboard