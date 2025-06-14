'use server'

import api from "./api";

const PATH = '/topics';

type TopicsActionProps = {
  payload?: any;
  message?: string;
};

export const getTopics = async (): Promise<TopicsActionProps> => {
  try {
    const res = await api(PATH, 'GET');
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};

export const createTopics = async (topic: any): Promise<TopicsActionProps> => {
  try {
    const res = await api(PATH, 'POST', topic);
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};

export const getTopic = async (id: string): Promise<TopicsActionProps> => {
  try {
    const res = await api(`${PATH}/${id}`, 'GET');
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};

export const enrollInTopic = async (id: string, userId: string): Promise<TopicsActionProps> => {
  try {
    const res = await api(`${PATH}/${id}/enroll`, 'POST', {userId});
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};

export const updateTopic = async (id: string, topic: any): Promise<TopicsActionProps> => {
  try {
    const res = await api(`${PATH}/${id}`, 'PUT', topic);
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};

export const deleteTopic = async (id: string): Promise<TopicsActionProps> => {
  try {
    const res = await api(`${PATH}/${id}`, 'DELETE');
    const data = await res.json();

    return { message: 'SUCCESS', payload: data };
  } catch (error) {
    return { message: 'ERROR', payload: null };
  }
};