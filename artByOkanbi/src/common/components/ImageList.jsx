import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'
import Modal from './Modal'

gsap.registerPlugin(ScrollTrigger)

const BentoGrid = styled(motion.div)`
  padding: 100px 40px 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 250px;
  grid-auto-flow: dense;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    gap: 15px;
    padding: 80px 20px 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
    gap: 12px;
  }
`

const BentoItem = styled(motion.div)`
  background: url(${props => props.$bgImage}) center center / cover no-repeat;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`

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
    <BentoGrid
      ref={containerRef}
      variants={staggeredGrid}
      initial='initial'
      animate='animate'
    >
      {images.map((image, index) => (
        <BentoItem
          key={index}
          ref={el => (imageRefs.current[index] = el)}
          variants={imageVariants}
          className='image'
          $bgImage={image}
          style={getBentoLayout(index)}
          onClick={() => handleImageClick(image)}
        />
      ))}
      <Modal isOpen={isOpen} onClose={onClose} imageSrc={selectedImage} description={"Art by Okanbi Ifatola"} />
    </BentoGrid>
  )
}
