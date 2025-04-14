'use server'

import CODES, { AuthCodeProps } from "@/lib/CODES";
import { cookies, headers } from "next/headers";
import api from "./api";

type AuthActionProps = {
  type: string,
  payload: any,
  code?: AuthCodeProps
}

export const loginAction = async (email: string, password: string): Promise<AuthActionProps> => {
    try {
      const response = await fetch(process.env.URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      
      
      if (data.error) {
        throw new Error(data.message + '|' + CODES.AUTH[data.message as AuthCodeProps])
      }

      (await cookies()).set('userId', data.id);
      return { type: 'LOGIN', payload: data }
    } catch (error: any) {
      const message = error.message.split('|')
      return { type: 'ERROR', payload: message[1], code: message[0] }
    }
}

export const signupAction = async (fullname: string, email: string, password: string) : Promise<AuthActionProps> => {
  try {
    const response = await fetch(process.env.URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, email, password })
    })
    const data = await response.json()
    if (data.error) {
      throw new Error(CODES.AUTH[data.message as AuthCodeProps])
    }
    return { type: 'SIGNUP', payload: data }
  } catch (error: any) {
    return { type: 'ERROR', payload: error.message}
  }
}

export const activateAction = async (code: string, email: string) : Promise<AuthActionProps> => {
  try {
    const response = await fetch(process.env.URL + '/auth/activate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ otd: parseInt(code), email })
    })
    const data = await response.json()
    if (data.error) {
      throw new Error(CODES.AUTH[data.message as AuthCodeProps])
    }
    return { type: 'ACTIVATE', payload: data }
  } catch (error: any) {
    return { type: 'ERROR', payload: error.message }
  }
}

export async function setUserCookie(user: UserProps) {
  (await cookies()).set('user', JSON.stringify(user))
}

export async function setSelectedTopicAndUserCookie(topicId: string, user: UserProps) {
  const cookiesStore = await cookies()
  cookiesStore.set('selectedTopicId', topicId)
  cookiesStore.set('user', JSON.stringify(user))
}

export async function getUserFromCookies() {
  'use server'
  
  const user = (await cookies()).get('user')?.value
  
  if(!user) return

  return JSON.parse(user) as UserProps
}