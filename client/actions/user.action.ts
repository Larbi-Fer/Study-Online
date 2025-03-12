'use server'

import api from "./api"

const path = '/user'

type UserActionProps = {
  payload?: any,
  message?: string,
}

export const nextLesson = async (id: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${id}/nextlevel`, 'POST')
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message}

    return {message: 'SUCCESS'}
  } catch (error) {
    return {message: 'ERROR'}
  }
}