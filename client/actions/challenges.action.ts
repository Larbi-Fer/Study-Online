import api from "./api"

const PATH = '/challenges'

type ChallengesActionProps = {
  payload?: any,
  message?: string,
}

export const getChallengeData = async (userId: string, topicId: string) : Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/?userId=${userId}&topicId=${topicId}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}