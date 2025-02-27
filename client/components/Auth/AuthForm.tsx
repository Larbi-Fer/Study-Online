'use client'
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './AuthFormStyle.css'
import React, { useEffect, useRef } from 'react'

const AuthForm = () => {
  const path = usePathname();
  const loginRef = useRef<HTMLFormElement>(null)
  const regRef = useRef<HTMLFormElement>(null)
  const authRef = useRef<HTMLDivElement>(null)
  const titlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!authRef.current) return
    if (path === '/login') {
      const h = loginRef.current?.clientHeight as number + (titlesRef.current?.clientHeight as number) + 40
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
        <div className="title-container" ref={titlesRef}>
          <div className={"title" + (path === '/login' ? '' : ' reg')}>
            <div className="login">Login</div>
            <div className="signup">Register</div>
          </div>
        </div>

        <div className={"auth-form" + (path === '/login' ? '' : ' reg')}>
          <form className="auth-fields login" ref={loginRef}>
            <div className="input">
              <Input label='Email' type="email" placeholder="example@service.domain" required />
            </div>
            <div className="input">
              <Input label='Password' type="password" placeholder="Type Strong Password" required />
            </div>
            <div className="action">
              <Button type='submit' fullWidth>Login</Button>
            </div>

            <div>
              You don't have account? <Link href='/signup'>Create account</Link>
            </div>
          </form>

          <form className="auth-fields reg" ref={regRef}>
            <div className="input">
              <Input label='Fullname' type="text" placeholder="Enter your first & last name" required />
            </div>
            <div className="input">
              <Input label='Email' type="email" placeholder="example@service.domain" required />
            </div>
            <div className="input">
              <Input label='Password' type="password" placeholder="Type Strong Password" required />
            </div>
            <div className="action">
              <Button type='submit' fullWidth>Sign up</Button>
            </div>

            <div>
              You already have account? <Link href='/login'>Go to login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthForm