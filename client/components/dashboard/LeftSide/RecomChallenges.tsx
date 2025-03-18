import ChallengesPreviw from "@/components/Challenges/ChallengesPreviw"

const RecomChallenges = ({challenges}: { challenges: ChallengesArgs[] }) => {
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