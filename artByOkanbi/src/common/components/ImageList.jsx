import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Modal from './Modal'

gsap.registerPlugin(ScrollTrigger)

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
  const imageRefs = useRef([])
  const containerRef = useRef(null)

  // GSAP ScrollTrigger animations for images
  useGSAP(
    () => {
      imageRefs.current.forEach((image) => {
        if (image) {
          gsap.fromTo(
            image,
            {
              opacity: 0,
              scale: 0.8,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: image,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    },
    { dependencies: [images], scope: containerRef }
  )

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

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsOpen(true)
  }

  // Bento grid layout patterns - defines size of each item
  const getBentoLayout = (index) => {
    const patterns = [
      { gridColumn: 'span 2', gridRow: 'span 2' },  // Square large
      { gridColumn: 'span 2', gridRow: 'span 1' },  // Horizontal
      { gridColumn: 'span 2', gridRow: 'span 2' },  // Square large
      { gridColumn: 'span 3', gridRow: 'span 1' },  // Wide
      { gridColumn: 'span 3', gridRow: 'span 2' },  // Wide tall
      { gridColumn: 'span 2', gridRow: 'span 1' },  // Horizontal
      { gridColumn: 'span 2', gridRow: 'span 2' },  // Square large
      { gridColumn: 'span 2', gridRow: 'span 1' },  // Horizontal
      { gridColumn: 'span 3', gridRow: 'span 2' },  // Wide tall
      { gridColumn: 'span 3', gridRow: 'span 1' },  // Wide
    ]
    return patterns[index % patterns.length]
  }

  return (
    <motion.div
      ref={containerRef}
      variants={staggeredGrid}
      initial='initial'
      animate='animate'
      className="pt-[100px] px-10 pb-10 grid grid-cols-6 auto-rows-[250px] gap-5 max-w-[1600px] mx-auto lg:grid-cols-4 lg:auto-rows-[200px] lg:gap-[15px] lg:pt-20 lg:px-5 lg:pb-5 md:grid-cols-2 md:auto-rows-[180px] md:gap-3"
      style={{ gridAutoFlow: 'dense' }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          ref={el => (imageRefs.current[index] = el)}
          variants={imageVariants}
          className='image cursor-pointer rounded-2xl overflow-hidden relative transition-transform duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-black/30 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100'
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            ...getBentoLayout(index)
          }}
          onClick={() => handleImageClick(image)}
        />
      ))}
      <Modal isOpen={isOpen} onClose={onClose} imageSrc={selectedImage} description={"Art by Okanbi Ifatola"} />
    </motion.div>
  )
}
