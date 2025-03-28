import { cookies } from "next/headers"

export const getUserData = async() => {
  'use server'
  const user = (await cookies()).get('user')?.value
  if (!user) return
  return JSON.parse(user)
}