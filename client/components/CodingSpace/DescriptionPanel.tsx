'use client'
import { TextIcon } from "lucide-react"
import Workspace from "./Workspace"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setProgrammes } from "@/lib/features/programmes"
import { TextareaAutosize } from "@mui/material"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const DescriptionPanel = ({programme, editing}: {programme: ProgrammeArgs, editing?: boolean}) => {
  const [isEdit, setIsEdit] = useState<'title' | 'description' | null>(null)
  const {programmes, i} = useAppSelector(state => ({programmes: state.programmes.codes, i: state.programmes.i}))
  const dispatch = useAppDispatch()

  const changeData = (name: string, value: string) => {
    setIsEdit(null)
    dispatch(setProgrammes(programmes.map((prog, index) => {
      if (index === i) {
        return {
          ...prog,
          [name]: value
        }
      }
      return prog
    })))
    // programme.description = e.target.value
  }

  return (
    <Workspace header={
      <div className='text-icon'>
        <TextIcon color='#59ff7c' />
        {editing ? (
          isEdit=='title' ?
            <input
              type="text"
              name="title"
              defaultValue={programme.title}
              onBlur={e => changeData('title', e.target.value)}
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  changeData('title', e.currentTarget.value)
                }
              }}
              onFocus={e => e.target.select()}
              className="without-border"
              placeholder="Title"
              style={{
                color: 'white',
                fontSize: '15px',
              }}
            />
          :
          <div onDoubleClick={() => setIsEdit('title')}>{programme.title}</div>
        )
        :
          <div>{programme.title}</div>
        }
      </div>
    }>
      {isEdit=='description' ?
        <TextareaAutosize
          defaultValue={programme.description}
          onBlur={e => changeData('description', e.target.value)}
          autoFocus
          onKeyDown={e => {
            // ctrl + enter
            if (e.key === 'Enter' && e.ctrlKey) {
              changeData('description', e.currentTarget.value)
            }
          }}
          className="without-border"
          placeholder="Description"
          style={{
            color: 'white',
            fontSize: '15px',
            minHeight: '100px',
            padding: '10px 20px'
          }}
        />
      :
        <div onDoubleClick={editing ? (() => setIsEdit('description')) : undefined} style={{padding: '10px 20px'}}>
          <Markdown remarkPlugins={[remarkGfm]}>
            {programme.description}
          </Markdown>
        </div>
      }
    </Workspace>
  )
}

export default DescriptionPanel