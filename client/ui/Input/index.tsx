import React from 'react'
import './style.css'
import { TextareaAutosize } from '@mui/material'

type InputProps = {
    label: string,
    suffix?: React.ReactNode,
    multiline?: boolean,
} & (React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement>)

const Input = ({ label, type, id, suffix, dir, multiline, ...props } : InputProps) => {
  return (
    <div className="text-field">
      <label htmlFor={ id ?? '' }>{label}</label>
      {multiline ?
        <TextareaAutosize dir='ltr' id={ id ?? '' } {...props as React.HTMLProps<HTMLTextAreaElement>} />
        :<input dir='ltr' type={type} id={ id ?? '' } {...props as React.HTMLProps<HTMLInputElement>} />
      }
      {suffix ? <div className='input-suffix'>{suffix}</div> : ''}
    </div>
  )
}

export default Input