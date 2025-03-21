import api from "./api"

const path = '/lessons'

type LessonsActionProps = {
  payload: any,
  message?: string,
  userMesseage?: string
}

export const getLessons = async (topicId: string): Promise<LessonsActionProps> => {
  try {
    const res = await api(`${path}/?topicId=${topicId}`, 'GET')
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