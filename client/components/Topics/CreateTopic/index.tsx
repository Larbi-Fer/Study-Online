'use client'
import { FocusEvent, FormEvent, useEffect, useState } from "react"
import TopicCard from "../TopicCard"
import * as motion from 'motion/react-client'
import './style.css'
import Input from "@/ui/Input"
import ImageUpload from "@/ui/ImageUpload"
import { removeFile } from "@/actions/imagekit.actions"
import Button from "@/ui/Button"
import { createTopics, getTopics, updateTopic } from "@/actions/topics.actions"
import { useRouter } from "next/navigation"
import Toast from "@/ui/Toast"
import { Autocomplete, TextField } from "@mui/material"

const animation = {
  hidden: {opacity: 0, y: 10},
  active: {opacity: 1, y: 0, transition: {staggerChildren: 0.15, duration: 0.5}},
}

const CreateOrUpdateTopic = ({id, defaultTopic}: {id?: string, defaultTopic?: Topic}) => {
  const [topic, setTopic] = useState<Topic>(defaultTopic || {id: '', title: 'title', description: 'description', icon: {path: '', id: ''}, image: {path: '', id: ''}, color: '#0059FF'})
  const [loading, setLoading] = useState(false)
  const [topicsList, setTopicsList] = useState<{title: string, id: string}[]>([])
  const [dependencies, setDependencies] = useState<{title: string, id: string}[]>(defaultTopic?.dependencies || [])
  const router = useRouter()

  useEffect(() => {
    (async() => {
      const ts = await getTopics()
      setTopicsList(id ? ts.payload.filter((t: any) => t.id != id) : ts.payload)
    })()
  }, [])
  

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    setTopic(prevTopic => ({...prevTopic, [e.target.name]: e.target.value}))
  }

  const changeFile = (field: 'image' | 'icon') => (path: string, id: string) => {
    if (topic[field].path) removeFile(topic.image.id)
    setTopic(prevTopic => ({...prevTopic, [field]: {path, id}}))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const subTopic: any = structuredClone(topic);
    delete subTopic.id
    const dep = dependencies.map(d => ({id: d.id}))
  
    if (id) {
      // Update existing topic
      subTopic.dependencies = {
        connect: [],
        disconnect: []
      }

      if (!defaultTopic?.dependencies) subTopic.dependencies.connect = dep
      else if (dep.length > 0)
        for (const currentDep of dep)
          if (defaultTopic.dependencies.findIndex(d => d.id == currentDep.id) == -1) subTopic.dependencies.connect.push({id: currentDep.id})

      if (defaultTopic?.dependencies)
        for (const defaultDep of defaultTopic?.dependencies)
          if (dep.findIndex(d => d.id == defaultDep.id) == -1) subTopic.dependencies.disconnect.push({id: defaultDep.id})

      await updateTopic(id, subTopic);
      Toast('Edit Successfully', 'success')
    } else {
      // Create new topicc;
      const result = await createTopics({...subTopic, dependencies: dep})
      router.replace(`/topics/${result.payload.id}/edit`)
    }

    setLoading(false)
  }

  return (
    <div className="create-topic-container">
      <div className="create-topic-fields">
        <motion.div className="out-container" variants={animation} initial='hidden' animate='active'>
          <form onSubmit={handleSubmit}>
            <motion.h2 variants={animation} style={{padding: '10px'}}>
              Create topic
            </motion.h2>
            <motion.div variants={animation} style={{padding: '10px'}}>
              <ImageUpload changeFile={changeFile('icon')} lable="Upload icon" />
            </motion.div>
            <Field label="Title" value={topic.title} name="title" handleChange={handleChange} />
            <Field label="Description" value={topic.description} name="description" handleChange={handleChange} multiline />
            <Field label="Color" value={topic.color} name="color" handleChange={handleChange} type="color" />
            <motion.div variants={animation} style={{padding: '10px'}}>
              <ImageUpload changeFile={changeFile('image')} />
            </motion.div>

            <motion.div variants={animation} style={{padding: '10px'}}>
              <label>Dependencies</label>
              <Autocomplete
                multiple
                id="dependencies"
                options={topicsList}
                getOptionLabel={(option) => option.title}
                value={dependencies}
                onChange={(_, val) => setDependencies(val)}
                renderInput={(params) => (
                  <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select "
                  />
                )}
              />
            </motion.div>

            <motion.div variants={animation} style={{padding: '10px'}}>
              <Button fullWidth loading={loading}>Submit</Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <div className="create-topic-card">
        <motion.h2 variants={animation} initial='hidden' animate='active' style={{padding: '10px'}}>
          Topic preview
        </motion.h2>
        <div style={{height: 'max-content'}}>
          <TopicCard topic={topic} i={1} />
        </div>
      </div>
    </div>
  )
}

const Field = ({label, name, value, handleChange, multiline, type, ...props}: {label: string, name: string, handleChange: any, multiline?: boolean, value: string, type?: string}) => {
  return (
    <motion.div variants={animation}>
      <Input defaultValue={value} label={label} name={name} onBlur={handleChange} multiline={multiline} onFocus={(e: any)=> e.target.select()} type={type || 'text'} required />
    </motion.div>
  )
}

export default CreateOrUpdateTopic