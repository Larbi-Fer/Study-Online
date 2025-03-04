'use server'

import CODES, { AuthCodeProps } from "@/lib/CODES"
import api from "./api"

const path = '/auth/reset'

type ResetActionProps = {
  payload: any,
  message?: AuthCodeProps,
  text?: string
}

export const searchEmailAction = async(email: string): Promise<ResetActionProps> => {
  try {
    const res = await api(path + '/email', 'POST', {email})
    const data = await res.json()

    return data as ResetActionProps
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}

export const sendCodeAction = async(id: string): Promise<ResetActionProps> => {
  try {
    const res = await api(path + '/send/' + id, 'POST')
    const data = await res.json()

    return data
  }
  catch (error) {
    return {message: 'ERROR', payload: null}
  }
}

export const verifyCodeAction = async(code: string, id: string): Promise<ResetActionProps> => {
  try {
    const res = await api(path + '/verify/' + id, 'POST', {otp: parseInt(code)})
    const data = await res.json()

    return {...data, text: CODES.AUTH[data.message as AuthCodeProps]}
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}

export const setPasswordAction = async(id: string, code: string, password: string, confirmPass: string): Promise<ResetActionProps> => {
  try {
    const res = await api(`${path}/password/${id}`, 'PATCH', {otp: parseInt(code), password, confirmPass})
    const data = await res.json()

    return {...data, text: CODES.AUTH[data.message as AuthCodeProps]}
  } catch (error) {
    return {message: 'ERROR', payload: null}
  }
}