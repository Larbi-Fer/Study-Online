'use server'

import api from "./api"
import { setSelectedTopic } from "./user.action"

const PATH = '/challenges'

type ChallengesActionProps = {
  payload?: any,
  message?: string,
}

export const getChallengesData = async (userId: string | null, topicId: string) : Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/?${userId ? ('userId=' + userId + '&') : ''}topicId=${topicId}`, 'GET')
    const data = await res.json()

    return data
  } catch (error) {
    console.error(error);
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

    if (data.payload) await setSelectedTopic(data.payload)

    return data
  } catch (error) {
    return {message: 'ERROR'}
  }
}

export const createChallenge = async (data: ProgrammeArgs, type: ProgrammeTypes, topicId: string): Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/create`, 'POST', {data, type, topicId});
    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error('Error creating challenge:', error);    
    return { message: 'ERROR' };
  }
};

export const updateChallenge = async (programmeId: string, data: ProgrammeArgs, topicId?: string): Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/update/${programmeId}`, 'PUT', {data: {...data, topicId}});
    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error('Error updating challenge:', error);
    return { message: 'ERROR' };
  }
};

export const deleteChallenge = async (programmeId: string): Promise<ChallengesActionProps> => {
  try {
    const res = await api(`${PATH}/delete/?programmeId=${programmeId}`, 'DELETE');
    const responseData = await res.json();

    return responseData;
  } catch (error) {
    return { message: 'ERROR' };
  }
};