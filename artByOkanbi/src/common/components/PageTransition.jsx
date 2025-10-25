import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;

      if (overlay && content) {
        const tl = gsap.timeline();

        tl.to(overlay, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.5,
          ease: 'power3.inOut',
        })
          .to(
            content,
            {
              opacity: 0,
              y: 20,
              duration: 0.3,
            },
            '-=0.3'
          )
          .set(content, {
            y: -20,
          })
          .to(content, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
          .to(
            overlay,
            {
              scaleX: 0,
              transformOrigin: 'right',
              duration: 0.5,
              ease: 'power3.inOut',
            },
            '-=0.3'
          );
      }
    },
    { dependencies: [location.pathname], scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2] z-[9999] pointer-events-none scale-x-0 origin-left"
      />
      <div ref={contentRef} className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
