'use client'

import { Editor, MonacoDiffEditor } from '@monaco-editor/react'
import React, { useEffect, useRef, useState } from 'react'
import Workspace from './Workspace'
import Button from '@/ui/Button'
import Image from 'next/image'
import { RotateCcwIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setOutput, setSubmit, setCode } from '@/lib/features/programmes'
import Loading from '@/ui/Loading'
import { Autocomplete, createTheme, TextField, ThemeProvider, Tooltip } from '@mui/material'
import { getTopics } from '@/actions/topics.actions'
import Toast from '@/ui/Toast'
import { createChallenge, updateChallenge } from '@/actions/challenges.action'
import { useParams, useRouter } from 'next/navigation'

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Switch to dark mode
  },
});

const EditorPanel = ({ code }: {code: string}) => {
  const editorRef = useRef<MonacoDiffEditor>(null);
  const { isEditing, userRole } = useAppSelector(state => ({isEditing: state.programmes.edit, userRole: state.user?.role}))

  const handleEditorDidMount = (editor: MonacoDiffEditor) => {
    editorRef.current = editor;
  }

  const reset = () => {
    editorRef.current.setValue(code)
  }

  return (
    <Workspace header={<Header reset={reset} editor={editorRef} isEditing={isEditing} userRole={userRole} />}>
      <div style={{overflow: 'hidden'}}>
        <Editor
          defaultLanguage='python'
          defaultValue={code}
          theme='vs-dark'
          height='calc(100vh - 70px)'
          onMount={handleEditorDidMount}
          loading={<Loading />}
          options={{
            minimap: { enabled: false },
            cursorBlinking: "smooth",
            smoothScrolling: true,
            readOnly: userRole == 'code_reviewer',
            padding: { top: 10 }
          }}
        />
      </div>
    </Workspace>
  )
}

const Header = ({reset, editor, isEditing, userRole}: {reset: () => void, editor: React.RefObject<MonacoDiffEditor>, isEditing?: boolean, userRole?: string}) => {
  const dispatch = useAppDispatch()
  const program = useAppSelector(state => state.programmes.codes[state.programmes.i])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState<{title: string, id: string} | null>(null)
  const [listTopics, setListTopics] = useState<[{title: string, id: string}] | []>([])
  const { id: progId } = useParams<{id: string}>()
  const router = useRouter()

  useEffect(() => {
    (async() => {
      const fetchedTopics = await getTopics()
      if (fetchedTopics.message == 'SUCCESS') setListTopics(fetchedTopics.payload)
    })()
  }, [])

  const executeProgramme = async() => {
    setLoading(true)
    const code = editor.current.getValue()
    console.log(code);

    dispatch(setCode(code))

    const data = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{
            content: editor.current.getValue()
          }]
        })
      })

    const res = await data.json()

    const container = document.getElementById("coding-container");
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    dispatch(setOutput({ type: res.run.stderr ? 'error' : 'success', content: res.run.output }))
    setLoading(false)
  }

  const saveProgramme = async () => {
    setLoading(true)
    
    const code = editor.current.getValue()
    const goal = (document.getElementById('output-goal') as HTMLTextAreaElement)?.value || ''

    if (!topic && !progId) {
      setLoading(false)
      return Toast('Please select a topic', 'error')
    }

    const data = {
      title: program.title,
      description: program.description,
      code, goal,
      points: parseInt(program.points as string),
      requiredLvl: parseInt(program.requiredLvl as string)
    }

    const res = progId ? await updateChallenge(progId, data, topic?.id)
                       : await createChallenge(data , 'challenge', topic?.id!)
    
    if (res.message != 'SUCCESS') Toast('something went wrong', 'error')

    setLoading(false)

    if(!progId) {
      router.replace(`/challenges/${res.payload}`)
    }
  }

  const handleReview = () => {
    // Put code value in store
    const code = editor.current.getValue()
    console.log(code);

    dispatch(setCode(code))
    dispatch(setSubmit(true))
  }

  return (
    <div className='code-header'>
      <div className="left">
        <div className='left-img'>
          <Image src='/images/py-icon.png' alt='py' width={23} height={23} />
        </div>
        <div className='left-content'>
          <h4>Python</h4>
          <p>Write and execute your code</p>
        </div>
      </div>


      <div className="right">
        {isEditing &&
          <div className="action">
            <ThemeProvider theme={darkTheme}>
              <Autocomplete
                disablePortal
                // TODO: fetch topics
                options={listTopics}
                getOptionLabel={(option) => option.title}
                sx={{
                  width: 180,
                  '.MuiInputBase-root': { padding: '0 10px' },
                }}
                onChange={(_, nv) => setTopic(nv)}
                value={topic}
                renderInput={(params) =>
                  <TextField {...params} placeholder="Topic" required />}
              />
            </ThemeProvider>
          </div>
        }
        <div className="action reset">
          <Button transparent onClick={reset}> <RotateCcwIcon size={20} /> </Button>
        </div>
        {userRole == 'student' &&
          <div className="action">
            <Tooltip title='Submit this code for review'>
              <Button onClick={handleReview}>Review</Button>
            </Tooltip>
          </div>
        }
        <div className="action run">
          {isEditing ?
            <Button onClick={saveProgramme} loading={loading}>Save</Button>
          :
            <Button background='green' onClick={executeProgramme} loading={loading}>Run</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default EditorPanel