import ChallengesPreviw from "@/components/Challenges/ChallengesPreviw"

const RecomChallenges = () => {
  return (
    <div className="dash-details">
      <h2>Recommended challenges</h2>
      <div className="challenges-preview">
        <ChallengesPreviw sm={4} challenges={[
          { id: '111', points: 10, requiredLvl: 1, title: 'title' },
          { id: '1112', points: 2, requiredLvl: 1, title: 'title2' },
          { id: '224', points: 15, requiredLvl: 2, title: 'title 3' },
          { id: '2241', points: 15, requiredLvl: 2, title: 'title 3' },
        ]} />
      </div>
    </div>
  )
}

export default RecomChallenges