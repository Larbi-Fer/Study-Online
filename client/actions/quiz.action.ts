'use server'

import api from "./api"

const path = '/quiz'

type LessonsActionProps = {
  payload?: any,
  message?: string,
}

export const getQuizById = async (quizId: string): Promise<LessonsActionProps> => {
  try {
    const res = await api(`${path}/${quizId}`, 'GET')
    const data = await res.json()

    return {message: 'SUCCESS', payload: data}
  } catch (error) {
    return {message: 'ERROR'}
  }
}