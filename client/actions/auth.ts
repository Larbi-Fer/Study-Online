'use server'

import { cookies } from 'next/headers'

interface User {
  id: string
  email: string
  fullname?: string
  role: 'admin' | 'student' | 'code_reviewer'
}

interface Session {
  user: User | null
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value
    
    if (!userId) {
      return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const user = await response.json()
    
    return { user }
  } catch (error) {
    console.error('Error fetching session:', error)
    return null
  }
} 