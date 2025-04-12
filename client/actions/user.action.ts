'use server'

import { QUIZ_PASS_PERCENTAGE } from "@/lib/constant"
import api from "./api"
import { cookies } from "next/headers"

const path = '/user'

type UserActionProps = {
  payload?: any,
  message?: string,
}

export const nextLesson = async (id: string, topicId: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${id}/next-lesson?topicId=${topicId}`, 'PATCH')
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message}
    
    return {message: 'SUCCESS', payload: data.payload}
  } catch (error) {
    return {message: 'ERROR'}
  }
}

export const setQuizResult = async (userId: string, quizId: string, answers: {byField: QuizStatistics[], general: QuizGeneralResults[]}, percent: number, topicId: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${userId}/quiz/answers`, 'PUT', {
      quizId, answers, percent, topicId
    })
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message}
    
    if (percent > QUIZ_PASS_PERCENTAGE) {
      // update user level on cookies
      const cookieStore = await cookies()
      const userData = cookieStore.get('user')?.value
      if (!userData) return {message: 'ERROR'}
      const user = JSON.parse(userData)
      user.level = Number(user.level) + 1
      cookieStore.set('user', JSON.stringify(user))
    }
    
    return {message: 'SUCCESS'}
  } catch (error) {
    console.error(error)
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