import Image from "next/image"
import TopicCard from "../TopicCard"
import * as motion from 'motion/react-client'
import EnrollButton from "./EnrollButton";

const containerVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.25,
    }
  }
};
const TopicSide = ({topic}: {topic: Topic}) => {
  const dependencies = (topic.dependencies as Topic[]).map(d => ({...d, description: d.description.split(' ').slice(0, 5).join(' ') + ' ...'}))

  return (
    <motion.div 
      className="topic-side"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="topic-details" variants={containerVariants}>
        <motion.div variants={containerVariants} className="topic-side-enroll">
          <EnrollButton topic={topic} id={topic.id} />
        </motion.div>
        <motion.div variants={containerVariants} className="topic-side-image">
          <Image src={topic.image.path || '/images/default-topic.jpg'} alt={topic.title} width={100} height={100} />
        </motion.div>
        <motion.div variants={containerVariants} className="topic-side-header">
          {topic.icon.path && <Image src={topic.icon.path} alt={topic.title} width={35} height={35} />}
          <h1>{topic.title}</h1>
        </motion.div>
        <motion.div variants={containerVariants} className="topic-side-content">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;{topic.description}</p>
        </motion.div>
      </motion.div>

      <motion.div className="topic-side-dependencies" variants={containerVariants}>
        <h2>Dependencies</h2>
        <div className="topic-side-dependencies-list">
          {topic.dependencies?.length! > 0 ? (
            dependencies?.map(dependency => (
              <motion.div key={dependency.id} variants={containerVariants}>
                <TopicCard topic={dependency} i={0} maxWidth={200} />
              </motion.div>
            ))
          ) : (
            <motion.div variants={containerVariants}>No dependencies</motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>

  )
}

export default TopicSide
