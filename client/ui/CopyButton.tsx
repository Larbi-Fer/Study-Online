import { Tooltip } from '@mui/material'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import React, { useState } from 'react'

const CopyButton = ({text}: {text: string}) => {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text: ', error)
    }
  }

  return (
    <Tooltip title="Copy">
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}} onClick={copy}>
        <span style={{fontSize: '0.8rem'}}>{copied ? 'Copied' : 'Copy'}</span>
        {copied ? <CopyCheckIcon size={18} /> : <CopyIcon size={18} />}
      </div>
    </Tooltip>
  )
}

export default CopyButton
