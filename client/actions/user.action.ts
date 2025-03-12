'use server'

import api from "./api"

const path = '/user'

type UserActionProps = {
  payload?: any,
  message?: string,
}

export const nextLesson = async (id: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${id}/next-lesson`, 'PATCH')
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message}
    
    return {message: 'SUCCESS', payload: data.payload}
  } catch (error) {
    return {message: 'ERROR'}
  }
}