'use client'

import { useRef, useState } from "react"
import LessonContant from "../../LessonContent"
import EditItem from "./EditItem"
import './style.css'
import { SelectChangeEvent } from "@mui/material"
import { ChevronDownIcon, Trash2Icon } from "lucide-react"
import * as motion from 'motion/react-client'
import { AnimatePresence, Reorder } from "motion/react"
import { DEFAULT_LESSON_ITEM, LESSON_CONTNET_TYPES } from "@/lib/constant"

type ChangeContent = (content: LessonSlideAndIdProps, slide: number, i: number) => void

type EditingSpaceProps = {
  item: LessonSlideAndIdProps,
  handleChangeContent: ChangeContent,
  slide: number,
  itemNumber: number,
  changeType: ChangeContent,
  RemoveItem: (slide: number, i: number) => void
}

const EditingSpace = ({ item, handleChangeContent, slide, itemNumber, changeType, RemoveItem }: EditingSpaceProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [type, setType] = useState(item.type)
  const id= useRef(Math.random())
  const [showList, setShowList] = useState(false)

  const endEditing = (content: LessonSlideAndIdProps) => {
    handleChangeContent(content, slide, itemNumber)
    setIsEditing(false)
  }

  const handleChange = (type: LessonContentType) => {
    setShowList(false)
    const prevValue = item.type == 'markdown' ? item.markdown :
                      item.type == 'code' ? item.code :
                      item.type == 'list' ? item.list[0] :
                      DEFAULT_LESSON_ITEM;
    let newItem: LessonSlideAndIdProps;
    switch (type) {
      case 'markdown': newItem = {id: Math.random(), type, markdown: prevValue}; break;
      case 'code': newItem = {id: Math.random(), type, language: 'python', code: prevValue}; break;
      case 'img': newItem = {id: Math.random(), type, img: ''}; break;
      case 'list': newItem = {id: Math.random(), type, list: [prevValue]}; break;
      case 'question': newItem = {id: Math.random(), type, questionId: ''}; break;
    }

    changeType(newItem, slide, itemNumber)
  }

  return (
    isEditing ?
      <EditItem content={item} onEndEditing={endEditing} />
    :
      <Reorder.Item
        value={item}
        as="div"
        initial={{opacity: 0, y: 5}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, x: -20}}
      >
        <div className="edit-container">
          <div onDoubleClick={() => setIsEditing(true)}>
            <LessonContant content={item} />
          </div>
          <div className="type-list-container" style={{zIndex: '5555'}}>
            <button onClick={() => setShowList(prev => !prev)} className="type-list-button"> <ChevronDownIcon /> </button>

            <AnimatePresence>
              {showList &&
                <motion.div className="type-list">
                  {LESSON_CONTNET_TYPES.map(type => <div key={type} onClick={() => handleChange(type)} className="type-item">{type}</div>)}
                </motion.div>
              }
            </AnimatePresence>
          </div>

          <div className="delete-button">
            <button onClick={() => RemoveItem(slide, itemNumber)}> <Trash2Icon /> </button>
          </div>
        </div>
      </Reorder.Item>
  )
}

export default EditingSpace