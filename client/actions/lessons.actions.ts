'use server'

import api from "./api"

const path = '/lessons'

type LessonsActionProps = {
  payload: any,
  message?: string,
  userMesseage?: string
}

export const getLessons = async (topicId: string, userId: string | null): Promise<LessonsActionProps> => {
  try {
    const res = await api(`${path}/?topicId=${topicId}&userId=${userId ?? ''}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}

export const getLesson = async (lessonId: string): Promise<LessonsActionProps> => {
  try {
    const res = await api(`${path}/${lessonId}`, 'GET')
    const data = await res.json()
    
    return data
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}

export const createLesson = async (title: string, topicId: string, lessonData: LessonSlidesProps): Promise<LessonsActionProps> => {
  try {
    const res = await api(`${path}/create`, 'POST', {title, topicId, data: lessonData})
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}