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

export const setQuizResult = async (userId: string, quizId: string, answers: {byField: QuizStatistics[], general: QuizGeneralResults[]}, percent: number): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${userId}/quiz/answers`, 'PUT', {
      quizId, answers, percent
    })
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message}
    
    
    return {message: 'SUCCESS'}
  } catch (error) {
    return {message: 'ERROR'}
  }
}

export const GetQuizResult = async (userId: string, quizId: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${userId}/quiz/result/?quizId=${quizId}`, 'GET')
    const data = await res.json()

    return { message: data.message, payload: data.payload }
  } catch (error) {
    console.error(error);
    return {message: 'ERROR'}
  }
}

export const getStreaks = async (userId: string, month: number): Promise<UserActionProps> => {
  try {
    const res = await api(`/course/${userId}/streaks/?month=${month}`, 'GET')
    const data = await res.json()

    return { message: data.message, payload: data.payload }
  } catch (error) {
    console.error(error);
    return {message: 'ERROR'}
  }
}