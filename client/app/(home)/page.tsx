'use client'
import * as motion from 'motion/react-client'
import './style.css'
import Button from '@/ui/Button'
import { useEffect } from 'react'
import Link from 'next/link'

const MainPage = () => {

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
        header?.classList.remove('main-page-nav');
      } else {
        header?.classList.add('main-page-nav');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  

  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Master Coding Skills</h1>
          <p>Join our community and enhance your programming knowledge through interactive lessons and challenges</p>
          <Link href='/signup' className='a-button'>
            <Button className='cta-button'>Join for free</Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Platform Features</h2>
        
        {/* Feature 1 - Image on left */}
        <motion.div 
          className="feature-item"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="feature-image">
            <motion.img 
              src="/images/main-page/topics-page-screenshot.png" 
              alt="Topics" 
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="feature-content">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Explore Topics</h3>
              <p>Browse through various programming concepts organized by difficulty level. Our platform offers a wide range of topics from beginner to advanced, ensuring that you can progress at your own pace and gradually build your skills. Each topic is carefully curated to provide comprehensive understanding and practical applications.</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Feature 2 - Image on right */}
        <motion.div 
          className="feature-item"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="feature-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Interactive Lessons</h3>
              <p>Learn through comprehensive lessons with examples and explanations. Our interactive approach ensures that you not only understand the concepts but also learn how to apply them in real-world scenarios. Each lesson includes code examples, practice exercises, and quizzes to reinforce your understanding and retention of the material.</p>
            </motion.div>
          </div>
          <div className="feature-image">
            <motion.img 
              src="/images/main-page/lesson-page-screenshot.png" 
              alt="Lessons" 
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
        
        {/* Feature 3 - Image on left */}
        <motion.div 
          className="feature-item"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="feature-image">
            <motion.img 
              src="/images/main-page/challenges-page-screenshot.png" 
              alt="Challenges" 
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="feature-content">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Practice Challenges</h3>
              <p>Test your skills with coding challenges of varying complexity. Our platform provides a range of challenges designed to test and strengthen your programming abilities. From simple algorithm implementation to complex problem-solving tasks, these challenges will help you gain confidence and proficiency in writing efficient and effective code.</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Feature 4 - Image on right */}
        <motion.div 
          className="feature-item"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="feature-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Join Community</h3>
              <p>Connect with fellow learners and share your coding journey. Our community features allow you to collaborate, ask questions, and learn from others' experiences. Participate in discussions, share your projects, and receive feedback from peers and mentors. Building connections within the coding community can significantly enhance your learning experience and open up opportunities for growth.</p>
            </motion.div>
          </div>
          <div className="feature-image">
            <motion.img 
              src="/images/main-page/community-page-screenshot.png" 
              alt="Community" 
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Code Review System</h2>
        
        <motion.div 
          className="testimonials-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="testimonial-image">
            <img src="/images/main-page/reviews-page-screenshot.png" alt="User Reviews" />
          </div>
          <div className="testimonial-content">
            <motion.div 
              className="testimonial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p>No need to search extensively for answers to your programming questions — the review system will provide solutions to all your queries</p>
            </motion.div>
            
            <motion.div 
              className="testimonial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p>A discussion section will open with a reviewer, allowing you to ask all your questions.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Start Your Coding Journey?</h2>
          <p>Join thousands of learners mastering programming skills on our platform</p>
          <Link href='/signup'>
            <Button className='cta-button'>Sign Up Now</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default MainPage
