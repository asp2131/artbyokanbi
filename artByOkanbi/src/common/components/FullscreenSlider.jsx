import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import Modal from './Modal';

gsap.registerPlugin(Observer);

export default function FullscreenSlider({ images, titles }) {
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  useGSAP(() => {
    const sections = gsap.utils.toArray('.slide');
    const overlayImages = gsap.utils.toArray('.overlay-image').reverse();
    const slideImages = gsap.utils.toArray('.slide__img');
    const outerWrappers = gsap.utils.toArray('.slide__outer');
    const innerWrappers = gsap.utils.toArray('.slide__inner');
    const count = document.querySelector('.count');
    const wrap = gsap.utils.wrap(0, sections.length);

    // Initial setup
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set('.slide:nth-of-type(1) .slide__outer', { xPercent: 0 });
    gsap.set('.slide:nth-of-type(1) .slide__inner', { xPercent: 0 });

    function gotoSection(index, direction) {
      animatingRef.current = true;
      index = wrap(index);

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.inOut' },
        onComplete: () => {
          animatingRef.current = false;
        }
      });

      const currentSection = sections[currentIndexRef.current];
      const heading = currentSection.querySelector('.slide__heading');
      const nextSection = sections[index];
      const nextHeading = nextSection.querySelector('.slide__heading');

      gsap.set([sections, overlayImages], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndexRef.current], overlayImages[index]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index], overlayImages[currentIndexRef.current]], { zIndex: 2, autoAlpha: 1 });

      tl
        .set(count, { textContent: (index + 1).toString().padStart(1, '0') }, 0.32)
        .fromTo(
          outerWrappers[index],
          { xPercent: 100 * direction },
          { xPercent: 0 },
          0
        )
        .fromTo(
          innerWrappers[index],
          { xPercent: -100 * direction },
          { xPercent: 0 },
          0
        )
        .to(
          heading,
          {
            xPercent: 30 * direction,
            opacity: 0.3
          },
          0
        )
        .fromTo(
          nextHeading,
          {
            xPercent: -30 * direction,
            opacity: 0.3
          },
          {
            xPercent: 0,
            opacity: 1
          },
          0
        )
        .fromTo(
          overlayImages[index],
          {
            xPercent: 125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          overlayImages[currentIndexRef.current],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          {
            xPercent: -125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          0
        )
        .fromTo(
          slideImages[index],
          { scale: 2 },
          { scale: 1 },
          0
        )
        .timeScale(0.8);

      currentIndexRef.current = index;
    }

    // Observer for scroll, touch, and pointer events
    Observer.create({
      type: 'wheel,touch,pointer',
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animatingRef.current) return;
        gotoSection(currentIndexRef.current + 1, +1);
      },
      onDown: () => {
        if (animatingRef.current) return;
        gotoSection(currentIndexRef.current - 1, -1);
      },
      tolerance: 10
    });

    // Keyboard navigation
    const handleKeydown = (e) => {
      if ((e.code === 'ArrowUp' || e.code === 'ArrowLeft') && !animatingRef.current) {
        gotoSection(currentIndexRef.current - 1, -1);
      }
      if (
        (e.code === 'ArrowDown' ||
          e.code === 'ArrowRight' ||
          e.code === 'Space' ||
          e.code === 'Enter') &&
        !animatingRef.current
      ) {
        gotoSection(currentIndexRef.current + 1, 1);
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, { scope: containerRef, dependencies: [images] });

  const handleImageClick = (image, title) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={containerRef} className="fullscreen-slider">
      {/* Slides */}
      {images.map((image, index) => (
        <section key={index} className={`slide ${index === 0 ? 'visible' : ''}`}>
          <div className="slide__outer">
            <div className="slide__inner">
              <div className={`slide__content slide-bg-${index + 1}`}>
                <div className="slide__container">
                  <h2 className="slide__heading">{titles[index]}</h2>
                  <figure
                    className="slide__img-cont cursor-pointer"
                    onClick={() => handleImageClick(image, titles[index])}
                  >
                    <img className="slide__img" src={image} alt={titles[index]} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Overlay with large images */}
      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">
            0<span className="count">1</span>
          </p>
          <figure className="overlay__img-cont">
            {images.map((image, index) => (
              <img
                key={index}
                className="overlay-image cursor-pointer"
                src={image}
                alt={`Artwork ${index + 1}`}
                onClick={() => handleImageClick(image, titles[index])}
              />
            ))}
          </figure>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImage}
        description={`${selectedTitle} - Art by Okanbi Ifatola`}
      />
    </div>
  );
}
