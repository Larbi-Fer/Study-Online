'use client'

import api from "./api"

const PATH = '/challenges'

type ChallengesActionProps = {
  payload?: any,
  message?: string,
}

export const getChallengesData = async (userId: string, topicId: string) : Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/?userId=${userId}&topicId=${topicId}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}

export const getChallenge = async (progId: string) : Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/${progId}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}

export const challengeDone = async (userId: string, progId: string) : Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/${progId}/?userId=${userId}`, 'POST')
    const data = await res.json()

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}