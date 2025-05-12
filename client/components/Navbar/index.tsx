'use client'

import Link from "next/link"

import Button from "@/ui/Button"
import Search from "./Search"
import { UserCircle } from "lucide-react"

import './style.css'
import ProfileMenu from "./ProfileMenu"

type NavbarProps = {
  type: 'student' | 'reviewer' | 'main-page'
}

const Navbar = ({ type }: NavbarProps) => {
  return (
    <nav>
      <header className="fade">
        <h2 className="logo">
          <Link href='/dashboard'>Coding</Link>
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
            : null)}
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
              </>
            :
              <>
                <Link href='/signup' className="cta"><Button>GET STARTED</Button></Link>
                <Link href='/login' className="cta"><Button>LOGIN</Button></Link>
              </>
          }
        </div>
      </header>
    </nav>
  )
}

export default Navbar