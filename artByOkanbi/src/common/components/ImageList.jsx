import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
// import { useInView } from 'react-intersection-observer'
import Modal from './Modal'

const staggeredGrid = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const imageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

export default function StaggeredGrid({ images }) {
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  // translate all images based on mouse position
  useEffect(() => {
    const handleMouseMove = e => {
      const mouseDelta = e.clientX - window.innerWidth / 2,
        maxDelta = window.innerWidth / 2

      const percentage = (mouseDelta / maxDelta) * -100

      for (const image of document.getElementsByClassName('image')) {
        image.style.objectPosition = `${100 + percentage}% center`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleImageLoad = () => {
    setLoaded(true)
  }

  const handleImageMove = e => {
    const mouseDelta = e.clientX - window.innerWidth / 2,
      maxDelta = window.innerWidth / 2

    const percentage = (mouseDelta / maxDelta) * -100

    e.target.style.objectPosition = `${100 + percentage}% center`
  }

  const handleImageEnter = e => {
    e.target.style.filter = 'none'
    //translate image based on mouse position
  }

  const handleImageLeave = e => {
    e.target.style.filter = 'blur(10px)'
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const handleImageClick = e => {
    setSelectedImage(e.target.style.backgroundImage.slice(5, -2))
    console.log(e.target.style.backgroundImage.slice(5, -2))
    setIsOpen(true)
  }

  return (
    <motion.div
      variants={staggeredGrid}
      initial='initial'
      animate='animate'
      style={{
        paddingTop: '5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gridAutoRows: 'minmax(250px, auto)',
        gridGap: '1rem',
      }}
    >
      {images.map((image, index) => (
        <>
        <motion.div
          key={index}
          variants={imageVariants}
          className='image'
          style={{
            background: `url(${image}) center center / cover no-repeat`,
            cursor: 'pointer',
            opacity: loaded ? 1 : 0,
            // filter: loaded ? 'none' : 'blur(10px)',
            height: '100%',
            width: '100%',
          }}
          onClick={handleImageClick}
          // onMouseEnter={handleImageEnter}
          // onMouseLeave={handleImageLeave}
        />
        </>
      ))}
      <Modal isOpen={isOpen} onClose={onClose} imageSrc={selectedImage} description={"Art by Okanbi Ifatola"} />
    </motion.div>
  )
}
