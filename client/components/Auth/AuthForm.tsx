'use client'
import { usePathname } from 'next/navigation';
import './AuthFormStyle.css'
import React, { useEffect, useRef } from 'react'
import Login from './Login';
import Signup from './Signup';

const AuthForm = () => {
  const path = usePathname();
  const loginRef = useRef<HTMLFormElement>(null)
  const regRef = useRef<HTMLFormElement>(null)
  const authRef = useRef<HTMLDivElement>(null)
  const titlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!authRef.current) return
    if (path === '/login') {
      const h = loginRef.current?.clientHeight! + titlesRef.current?.clientHeight! + 40
      authRef.current.style.height = h + 'px'
    } else {
      const h = regRef.current?.clientHeight!+ titlesRef.current?.clientHeight! + 40
      authRef.current.style.height = h + 'px'
    }
  }
  ,[path])

  return (
    <div className='auth-container'>
      <div className="auth" ref={authRef}>
        <div className="auth-header">
          <div className="title-container" ref={titlesRef}>
            <div className={"title" + (path === '/login' ? '' : ' reg')}>
              <div className="login">Login</div>
              <div className="signup">Register</div>
            </div>
          </div>
        </div>

        <div className={"auth-form" + (path === '/login' ? '' : ' reg')}>

          {/* Login */}
          <form className="auth-fields login" ref={loginRef}>
            <Login />
          </form>

          {/* Register */}
          <form className="auth-fields reg" ref={regRef}>
            <Signup />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthForm