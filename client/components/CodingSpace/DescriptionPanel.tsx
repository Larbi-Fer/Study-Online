'use client'
import { TextIcon } from "lucide-react"
import Workspace from "./Workspace"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setProgrammes } from "@/lib/features/programmes"
import { TextareaAutosize } from "@mui/material"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

type IsEditProps = 'title' | 'description' | 'points' | 'requiredLvl' | null

const DescriptionPanel = ({programme, editing}: {programme: ProgrammeArgs, editing?: boolean}) => {
  const [isEdit, setIsEdit] = useState<IsEditProps>(null)
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {editing ? (
          // isEdit=='title' ?
            /* <input
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
          <div onDoubleClick={() => setIsEdit('title')}>{programme.title}</div> */
          <>
            <div className="text-icon">
              <TextIcon color='#59ff7c' />
              <EditInput width="100px" isEdit={isEdit == 'title'} value={programme.title} changeData={v => changeData('title', v)} setIsEdit={() => setIsEdit('title')} text={programme.title} />
            </div>
            <EditInput width="18px" isEdit={isEdit == 'points'} value={programme.points} changeData={v => changeData('points', v)} setIsEdit={() => setIsEdit('points')} text={programme.points + ' points'} />
            <EditInput width="18px" isEdit={isEdit == 'requiredLvl'} value={programme.requiredLvl} changeData={v => changeData('requiredLvl', v)} setIsEdit={() => setIsEdit('requiredLvl')} text={'Level: ' + programme.requiredLvl} />
          </>
        )
        :
          <>
            <div className="text-icon">
              <TextIcon color='#59ff7c' />
              {programme.title}
            </div>
            <div>{programme.points} points</div>
            <div>Level: {programme.requiredLvl}</div>
          </>
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

const EditInput = ({isEdit, value, changeData, setIsEdit, text, width}: {isEdit: boolean, value: string | number, changeData: (value: string) => void, setIsEdit: () => void, text: string, width: string}) => {
  return (
    isEdit ?
      <input
        type="text"
        name="title"
        defaultValue={value}
        onBlur={e => changeData(e.target.value)}
        autoFocus
        onKeyDown={e => {
          if (e.key === 'Enter') {
            changeData(e.currentTarget.value)
          }
        }}
        onFocus={e => e.target.select()}
        className="without-border"
        placeholder="Title"
        style={{
          color: 'white',
          fontSize: '15px',
          width
        }}
      />
    :
    <div onDoubleClick={setIsEdit}>{text}</div>
  )
}

export default DescriptionPanel