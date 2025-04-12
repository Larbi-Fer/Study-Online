import { cookies } from 'next/headers'
import { getUserFromCookies } from '../actions/auth.actions'


export async function getUserData() {
  'use server'
  const user = (await cookies()).get('user')?.value
  if (!user) return
  return JSON.parse(user) as UserProps
}