'use client'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { setUser } from '@/lib/features/user'
import { getUserFromCookies } from '@/actions/auth.actions'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  // const [makedStore, setMakedStore] = useState(false)
  if (!storeRef.current) {
    storeRef.current = makeStore()  
  }

  useEffect(() => {
    ( async() => {
      if (!storeRef.current) return

      const user = await getUserFromCookies()
      
      if (user) storeRef.current.dispatch(setUser(user))
    } )()
    
  }, [storeRef.current])

  return <Provider store={storeRef.current}>{children}</Provider>
}