'use client'

import Link from "next/link"

import Button from "@/ui/Button"
import Search from "./Search"
import { UserCircle } from "lucide-react"

import './style.css'

type NavbarProps = {
  type: 'user' | 'main-page'
}

const Navbar = ({ type }: NavbarProps) => {
  return (
    <nav>
      <header className="fade">
        <h2 className="logo">
          <Link href='/dashboard'>Coding</Link>
        </h2>
        <nav>
          { type == 'user' ?
          <ul className="nav-links">
            <li><Link href='/lessons'>Lessons</Link></li>
            <li><Link href='/challenges'>Challenges</Link></li>
          </ul>
          : null}
        </nav>
        <div className="buttons">
          { type == 'user' ?
              <>
                <Search />
                <div className="text-icon"><UserCircle /></div>
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