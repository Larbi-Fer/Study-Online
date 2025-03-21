'use client'
import { RefObject, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import './style.css'

const CustomCursor = ({ objectRef }: { objectRef?: RefObject<any> }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true); // To track cursor visibility
  const [timer, setTimer] = useState<NodeJS.Timeout>(); // To track the timeout

  useEffect(() => {
    // Update cursor position when mouse moves
    const updateCursorPos = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Reset the cursor visibility whenever the mouse moves
      if (timer) clearTimeout(timer);

      setIsVisible(true);

      // Set a timeout to hide the cursor after 1 second of inactivity
      const newTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // 1 second of inactivity before hiding the cursor

      setTimer(newTimer);
    };

    // Add event listener to track mouse movement
    (objectRef?.current || window).addEventListener('mousemove', updateCursorPos);

    // Clean up the event listener
    return () => {
      (objectRef?.current || window).removeEventListener('mousemove', updateCursorPos);
      if (timer) clearTimeout(timer); // Cleanup the timeout on unmount
    };
  }, [timer]);

  return (
    <AnimatePresence>
      {isVisible &&
        <motion.div
          className="custom-cursor"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ left: cursorPos.x + 'px', top: cursorPos.y + 'px' }}>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default CustomCursor