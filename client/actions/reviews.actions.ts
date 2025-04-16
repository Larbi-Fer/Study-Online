'use server'

import api from "./api"
import { cookies } from "next/headers"

const path = '/code-review'

type ReviewActionProps = {
  payload?: any,
  message?: string,
}

export const getReviews = async (userId: string, role: UserRole): Promise<ReviewActionProps> => {
  try {
    const res = await api(`${path}?userId=${userId}&role=${role}`, 'GET')

    const data = await res.json()

    if (data.message !== 'SUCCESS') return { message: data.message }
    
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return { message: 'ERROR' }
  }
}

export const getReviewById = async (id: string, userId: string, role: UserRole): Promise<ReviewActionProps> => {
  try {
    const res = await api(`${path}/${id}/?userId=${userId}&role=${role}`, 'GET')
    const data = await res.json()
    
    if (data.message !== 'SUCCESS') return { message: data.message }
    
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error('Error fetching review:', error)
    return { message: 'ERROR' }
  }
}

export const createReview = async (reviewData: { 
  subject: string,
  explication: string,
  code: string,
  programmeId?: string
}, userId: string): Promise<ReviewActionProps> => {
  try {
    const res = await api(path, 'POST', {
      ...reviewData,
      userId
    })
    const data = await res.json()
    
    if (data.message !== 'SUCCESS') return { message: data.message }
    
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error('Error creating review:', error)
    return { message: 'ERROR' }
  }
}

export const assignReviewer = async (reviewId: string, userId: string): Promise<ReviewActionProps> => {
  try {
    const res = await api(`${path}/${reviewId}/assign`, 'POST', {
      reviewerId: userId
    })
    const data = await res.json()
    
    if (data.message !== 'SUCCESS') return { message: data.message }
    
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error('Error assigning reviewer:', error)
    return { message: 'ERROR' }
  }
}

export const addComment = async (
  reviewId: string, 
  message: string, 
  sender: 'student' | 'reviewer',
  userId: string, role: UserRole
): Promise<ReviewActionProps> => {
  try {
    const res = await api(`${path}/${reviewId}/comments`, 'POST', {
      message,
      sender,
      userId,
      role
    })
    const data = await res.json()
    
    if (data.message !== 'SUCCESS') return { message: data.message }
    
    return { message: 'SUCCESS', payload: data.payload }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { message: 'ERROR' }
  }
}