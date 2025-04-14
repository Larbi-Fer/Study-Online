import ChallengesPreviw from "@/components/Challenges/ChallengesPreviw"
import Loading from "@/ui/Loading"
import { useContext } from "react"
import { LoadingContext } from ".."

const RecomChallenges = ({challenges}: { challenges: ChallengesArgs[] }) => {
  const isLoading = useContext(LoadingContext)

  if (isLoading) return <div className="dash-details">
    <h2>Recommended challenges</h2>
    <div style={{height: '110px', position: 'relative'}}>
      <Loading />
    </div>
  </div>

  return (
    <div className="dash-details">
      <h2>Recommended challenges</h2>
      <div className="challenges-preview">
        <ChallengesPreviw sm={4} challenges={challenges} />
      </div>
    </div>
  )
}

export default RecomChallenges