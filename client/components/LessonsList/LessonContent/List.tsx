import * as motion from 'motion/react-client'

const listVariants = {
  initial: { y: 5, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
}

const List = ({ items }: {items: string[]}) => {
  return (
    <motion.ul
      variants={listVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={listVariants}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default List