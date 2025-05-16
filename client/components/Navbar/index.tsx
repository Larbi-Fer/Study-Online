'use client'

import Link from "next/link"

import Button from "@/ui/Button"
import Search from "./Search"

import './style.css'
import ProfileMenu from "./ProfileMenu"
import NotificationMenu from "./NotificationsMenu"

type NavbarProps = {
  type: 'student' | 'reviewer' | 'main-page'
}

const Navbar = ({ type }: NavbarProps) => {
  return (
    <nav>
      <header className={type == 'main-page' ? 'main-page-nav' : ''}>
        <h2 className="logo">
          <Link href={type == 'main-page' ? '/' : '/dashboard'}>Coding</Link>
        </h2>
        <nav>
          <ul className="nav-links">
          { type == 'student' ?
            <>
              <li><Link href='/lessons'>Lessons</Link></li>
              <li><Link href='/challenges'>Challenges</Link></li>
              <li><Link href='/topics'>Topics</Link></li>
              <li><Link href='/reviews'>Reviews</Link></li>
            </>
          : (type == 'reviewer' ?
            <>
              <li><Link href='/topics'>Topics</Link></li>
              <li><Link href='/order-reviews'>Order Reviews</Link></li>
              <li><Link href='/reviews'>Reviews</Link></li>
            </>
            : (type == 'main-page' ?
              <li><Link href='/topics'>Topics</Link></li>
            : null))}
            <li><Link href='/community'>Community</Link></li>
          </ul>
        </nav>
        <div className="buttons">
          { type != 'main-page' ?
              <>
                <Search />
                <div className="text-icon">
                  <ProfileMenu />
                </div>
                <div className="text-icon">
                  <NotificationMenu />
                </div>
              </>
            :
              <>
                <Link href='/login' className="cta"><Button transparent>LOGIN</Button></Link>
              </>
          }
        </div>
      </header>
    </nav>
  )
}

export default Navbar