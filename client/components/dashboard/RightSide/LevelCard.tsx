import { intToString } from "@/lib/utils"

const LevelCard = ({ level }: {level: number}) => {
  return (
    <div className="level-card">
      <div>Level</div>
      <div>{intToString(level)}</div>
    </div>
  )
}

export default LevelCard