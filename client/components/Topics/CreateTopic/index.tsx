'use client'
import { FocusEvent, useState } from "react"
import TopicCard from "../TopicCard"
import * as motion from 'motion/react-client'
import './style.css'
import Input from "@/ui/Input"
import ImageUpload from "@/ui/ImageUpload"

const animation = {
  hidden: {opacity: 0, y: 10},
  active: {opacity: 1, y: 0, transition: {staggerChildren: 0.15, duration: 0.5}},
}

const CreateTopic = () => {
  const [topic, setTopic] = useState<Topic>({id: '', title: 'title', description: 'description', image: ''})

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    setTopic(prevTopic => ({...prevTopic, [e.target.name]: e.target.value}))
  }

  return (
    <div className="create-topic-container">
      <motion.form variants={animation} initial='hidden' animate='active' className="create-topic-fields">
        <Field label="Title" name="title" handleChange={handleChange} />
        <Field label="Description" name="description" handleChange={handleChange} />
        <motion.div variants={animation} style={{padding: '10px'}}>
          <ImageUpload changeFile={filepath => setTopic(prevTopic => ({...prevTopic, image: filepath}))} />
        </motion.div>
      </motion.form>

      <div className="create-topic-card">
        <TopicCard topic={topic} i={0} />
      </div>
    </div>
  )
}

const Field = ({label, name, handleChange}: {label: string, name: string, handleChange: any}) => {
  return (
    <motion.div variants={animation}>
      <Input label={label} name={name} onBlur={handleChange} required />
    </motion.div>
  )
}

export default CreateTopic