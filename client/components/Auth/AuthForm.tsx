'use client'
import { usePathname } from 'next/navigation';
import './AuthFormStyle.css'
import React, { useEffect, useRef } from 'react'
import Login from './Login';
import Signup from './Signup';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Activate from './Activate';
import Reset from './Reset';

const AuthForm = () => {
  const path = usePathname();
  const loginRef = useRef<HTMLDivElement>(null)
  const regRef = useRef<HTMLDivElement>(null)
  const authRef = useRef<HTMLDivElement>(null)
  const actRef = useRef<HTMLDivElement>(null)
  const resRef = useRef<HTMLDivElement>(null)
  const titlesRef = useRef<HTMLDivElement>(null)

  let page = ' reset';
  if (path == '/login') page = ' login'
  else if (path == '/signup') page = ' reg'
  else if (path == '/activate') page = ' act'

  useEffect(() => {
    if (!authRef.current) return
    if (path === '/login') {
      const h = loginRef.current?.clientHeight! + titlesRef.current?.clientHeight! + 20
      authRef.current.style.height = h + 'px'
    } else if (path == '/signup') {
      const h = regRef.current?.clientHeight!+ titlesRef.current?.clientHeight! + 20
      authRef.current.style.height = h + 'px'
    } else if (path == '/activate') {
      const h = actRef.current?.clientHeight!+ titlesRef.current?.clientHeight! + 20
      authRef.current.style.height = h + 'px'
  } else {
      changeHigh()
    }
  }
  ,[path])

  const changeHigh = () => {
    if(!authRef.current) return
    const h = resRef.current?.clientHeight!+ titlesRef.current?.clientHeight! + 20
    authRef.current.style.height = h + 'px'
  }

  return (
    <div className='auth-container'>
      <div className="auth" ref={authRef}>
        <div className={"auth-header" + page}>
          <div className="title-container" ref={titlesRef}>
            <div className="title">
              <div className="reset">Reset Password</div>
              <div className="login">Login</div>
              <div className="signup">Register</div>
            </div>
          </div>
        </div>

        <div className={"auth-form" + page}>

          <div className="auth-fields reset" ref={resRef}>
            <Reset changeHigh={changeHigh} />
          </div>

          {/* Login */}
          <div className="auth-fields login" ref={loginRef}>
            <Login />
          </div>

          {/* Register */}
          <div className="auth-fields reg" ref={regRef}>
            <Signup />
          </div>

          <div className="auth-fields act" ref={actRef}>
            <Activate isActive={page == ' act'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm