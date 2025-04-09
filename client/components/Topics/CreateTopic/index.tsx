'use client'
import { FocusEvent, FormEvent, useState } from "react"
import TopicCard from "../TopicCard"
import * as motion from 'motion/react-client'
import './style.css'
import Input from "@/ui/Input"
import ImageUpload from "@/ui/ImageUpload"
import { removeFile } from "@/actions/imagekit.actions"
import Button from "@/ui/Button"
import { createTopics } from "@/actions/topics.actions"

const animation = {
  hidden: {opacity: 0, y: 10},
  active: {opacity: 1, y: 0, transition: {staggerChildren: 0.15, duration: 0.5}},
}

const CreateTopic = () => {
  const [topic, setTopic] = useState<Topic>({id: '', title: 'title', description: 'description', image: {path: '', id: ''}})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    setTopic(prevTopic => ({...prevTopic, [e.target.name]: e.target.value}))
  }

  const changeFile = (path: string, id: string) => {
    if (topic.image.path) removeFile(topic.image.id)
    setTopic(prevTopic => ({...prevTopic, image: {path, id}}))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const subTopic: any = topic;
    delete subTopic.id
    const data = await createTopics(subTopic)
    console.log(data);
    

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
            <Field label="Title" value={topic.title} name="title" handleChange={handleChange} />
            <Field label="Description" value={topic.description} name="description" handleChange={handleChange} multiline />
            <motion.div variants={animation} style={{padding: '10px'}}>
              <ImageUpload changeFile={changeFile} />
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

const Field = ({label, name, value, handleChange, multiline, ...props}: {label: string, name: string, handleChange: any, multiline?: boolean, value: string}) => {
  return (
    <motion.div variants={animation}>
      <Input defaultValue={value} label={label} name={name} onBlur={handleChange} multiline={multiline} onFocus={(e: any)=> e.target.select()} required />
    </motion.div>
  )
}

export default CreateTopic