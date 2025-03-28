'use client'
import Slides from "@/ui/Slides"
import { useState } from "react"
import EditingSpace from "./EditingSpace"
import * as motion from 'motion/react-client'
import { PlusCircleIcon } from "lucide-react"
import { DEFAULT_LESSON_ITEM } from "@/lib/constant"
import { Reorder } from "motion/react"

const CreateLesson = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<LessonSlideAndIdProps[][]>([[{id: Math.random(), type: 'markdown', markdown: DEFAULT_LESSON_ITEM}, {id: Math.random(), type: 'markdown', markdown: '#### Simple example 2'}, {id: Math.random(), type: 'markdown', markdown: '#### Simple example 3'}]])
  const [active, setActive] = useState<number>(0)

  const changeContent = (content: LessonSlideAndIdProps, slide: number, i: number) => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      updatedSlides[slide] = [...updatedSlides[slide]];
      updatedSlides[slide][i] = content;
      return updatedSlides;
    })
  }

  const newSlide = () => {
    setSlides(prevSlides => [...prevSlides, [{id: Math.random(), type: 'markdown', markdown: DEFAULT_LESSON_ITEM}]])
    setCurrentSlide(prev => prev+1)
  }

  const changeType = (newItem: LessonSlideAndIdProps, slide: number, i: number) => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      updatedSlides[slide] = [...updatedSlides[slide]];
      updatedSlides[slide][i] = newItem;
      return updatedSlides;
    })
  }

  const RemoveItem = (slide: number, i: number) => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      updatedSlides[slide] = [...updatedSlides[slide]];
      updatedSlides[slide].splice(i, 1)
      return updatedSlides;
    })
  }

  const addItem = () => {
    setSlides(prevSlides => {
      const updatedSlides = [...prevSlides];
      updatedSlides[currentSlide] = [...updatedSlides[currentSlide], {id: Math.random(), type: 'markdown', markdown: DEFAULT_LESSON_ITEM}];
      return updatedSlides;
    })
  }

  return (
    <div>
      <Slides
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        lastSlide={newSlide}
        slides={slides.length}
        animationMode="popLayout"
        lastSlideBtn="new slide"
      >
        <Reorder.Group
          axis="y"
          values={slides[currentSlide]}
          onReorder={e => {
            e.map((item, index) => {
              const newOrder = e.map((item) => item.id); // Assuming each item has an `id`
    
              // Update slides state with new order
              setSlides((prevSlides) => {
                const updatedSlides = [...prevSlides];
                updatedSlides[currentSlide] = newOrder.map((id) => {
                  return prevSlides[currentSlide].find((item) => item.id === id)!;
                });
                return updatedSlides;
              });

              // Set the active index after reordering
              const newActiveIndex = e.findIndex((item) => item.id === slides[currentSlide][currentSlide].id);
              setActive(newActiveIndex);
            })
          }} as="div" style={{width: '100%'}} >
          {slides[currentSlide].map((item, i) => (
            
              <EditingSpace
                key={item.id}
                item={item}
                handleChangeContent={changeContent}
                slide={currentSlide}
                itemNumber={i}
                changeType={changeType}
                RemoveItem={RemoveItem}
              />
          ))}
          <div className="add-button edit-container" onClick={addItem}>
            <PlusCircleIcon size={20} color="#333a" />
          </div>
        </Reorder.Group>
      </Slides>
    </div>
  )
}

export default CreateLesson