'use server'

import { QUIZ_PASS_PERCENTAGE } from "@/lib/constant"
import api from "./api"
import { cookies } from "next/headers"
import apiv2 from "./apiv2"

const path = '/user'

type UserActionProps = {
  payload?: any,
  message?: string,
  viewMessage?: string,
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

    if (data.payload) setSelectedTopic(data.payload)
    
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

export const getProfile = async (profileId: string, userId?: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/${profileId}/profile/?${userId ? `userId=${userId}` : ''}`, 'GET')
    const data = await res.json()

    return { message: data.message, payload: data.payload }
  } catch (error) {
    console.error(error);
    return {message: 'ERROR'}
  }
}

export const createReviewer = async (email: string, fullname: string, password: string): Promise<UserActionProps> => {
  try {
    const res = await api(`${path}/123/create-reviewer`, 'POST', {email, fullname, password})
    const data = await res.json()

    if (data.message != 'SUCCESS') return {message: data.message, viewMessage: data.viewMessage}
    
    return {message: 'SUCCESS', payload: data.payload}
  } catch (error) {
    console.error(error);
    return {message: 'ERROR'}
  }
}

export const getNotifications = async (userId: string): Promise<UserActionProps> => {
  try {
    const data = await apiv2.get(`${path}/${userId}/notifications`)

    return data
  } catch (error) {
    console.error(error);
    return {message: 'ERROR', payload: null}
  }
}

export const notificationSeen = async (userId: string, id: string): Promise<UserActionProps> => {
  try {
    console.log(userId, id);
    
    const data = await apiv2.post(`${path}/${userId}/notifications/${id}`)

    return data
  } catch (error) {
    console.error(error);
    return {message: 'ERROR', payload: null}
  }
}

export async function setSelectedTopic(topicId: string) {
  (await cookies()).set('selectedTopicId', topicId)
}

export async function userLogout() {
  const cookiesStore = await cookies();
  cookiesStore.delete('userId');
  cookiesStore.delete('selectedTopicId');
}