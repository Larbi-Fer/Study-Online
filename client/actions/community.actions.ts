'use server'
import { DISCUSSIONS_NUMBER } from '@/lib/constant'
import api from './apiv2'

const PATH = '/community'

type CommunityActionProps = {
  payload?: any,
  message?: string,
}

export const getDiscussions = async (userId?: string, options?: {
  take?: number, skip?: number, q?: string, tag?: string, orderBy?: 'vote' | 'newer'
}) : Promise<CommunityActionProps> => {
  try {
    const {skip, take, q, tag, orderBy} = options || {}
    const data = await api.get(`${PATH}/?userId=${userId || ''}&take=${take || DISCUSSIONS_NUMBER}&skip=${(skip || 0) * (take || DISCUSSIONS_NUMBER)}&q=${q || ''}&tag=${tag || ''}&orderBy=${orderBy || 'newer'}`)

    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error(error);
    return {message: 'ERROR'}
  }
}

export const voteDiscussion = async (discussionId: string, userId: string): Promise<CommunityActionProps> => {
  try {
    const data = await api.post(`${PATH}/vote/${discussionId}`, { userId })
    return { message: 'SUCCESS', payload: data }
  } catch (error) {
    console.error(error)
    return { message: 'ERROR' }
  }
}

export const getDiscussionDetails = async (discussionId: string, userId?: string): Promise<CommunityActionProps> => {
  try {
    const data = await api.get(`${PATH}/${discussionId}?userId=${userId || ''}`)
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error(error)
    return { message: 'ERROR' }
  }
}

export const addComment = async (discussionId: string, content: string, userId: string): Promise<CommunityActionProps> => {
  try {
    const data = await api.post(`${PATH}/${discussionId}/comments`, { content, userId })
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error(error)
    return { message: 'ERROR' }
  }
}

export const createDiscussion = async (
  fields: { title: string, content: string },
  tags: string[],
  userId: string
): Promise<CommunityActionProps> => {
  try {
    const data = await api.post(PATH, { ...fields, tags, userId })
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error(error)
    return { message: 'ERROR' }
  }
}

export const updateDiscussion = async (
  id: string,
  fields: { title: string, content: string },
  tags: string[]
): Promise<CommunityActionProps> => {
  try {
    const data = await api.post(`${PATH}/${id}`, { ...fields, tags })
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error(error)
    return { message: 'ERROR' }
  }
}