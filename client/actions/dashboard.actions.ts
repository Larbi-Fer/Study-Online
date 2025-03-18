'use server'

import api from "./api"

const PATH = '/course'

type DashActionProps = {
  payload?: any,
  message?: string,
}

export const getDashboardData = async (userId: string, topicId: string) : Promise<DashActionProps> => {
  try {
    const res = await api(`${PATH}/${userId}/?topicId=${topicId}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}