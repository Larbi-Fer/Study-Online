'use client'
import { useRef, useState } from 'react'
import './style.css'

type ButtonProps = {
  children: React.ReactNode,
  background?: string,
  fullWidth?: boolean,
  transparent?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, transparent, onClick, background, fullWidth, ...props } : ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [spans, setSpans] = useState<React.ReactNode[]>([])

  const handelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e)

    const mouseX = e.clientX;
    const mouseY = e.clientY;


    const buttonRect = btnRef.current?.getBoundingClientRect();
    if(!buttonRect) return;
    const buttonX = buttonRect.left;
    const buttonY = buttonRect.top;

    // Calculate the mouse position relative to the button
    const mouseRelativeX = mouseX - buttonX;
    const mouseRelativeY = mouseY - buttonY;

    // setSpans( old => [...old, <span key={Math.random()} style={{top: (e.pageY - btnRef.current?.offsetTop!) + "px", left: (e.pageX - btnRef.current?.offsetLeft!) + "px"}} />] )
    setSpans( old => [...old, <span key={Math.random()} style={{top: (mouseRelativeY) + "px", left: (mouseRelativeX) + "px"}} />] )
    setTimeout(() => {
      setSpans( old => old.slice(1) )
    }, 1000);
  }

  const btnStyle: React.CSSProperties = background ? {background} : {}
  if (fullWidth) btnStyle.width = '100%'

  return (
    <div className="button-container">
      <button {...props} className={'button' + ( transparent ? ' transparent' : ' primary' )} onClick={handelClick} ref={btnRef} style={btnStyle}>
        <p>{children}</p>
        { spans.map(span => span) }
      </button>
    </div>
  )
}

export default Button