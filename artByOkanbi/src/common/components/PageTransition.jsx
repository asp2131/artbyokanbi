import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styled from 'styled-components';

const TransitionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 9999;
  pointer-events: none;
  transform: scaleX(0);
  transform-origin: left;
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

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
        // Create timeline for page transition
        const tl = gsap.timeline();

        // Animate overlay in
        tl.to(overlay, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.5,
          ease: 'power3.inOut',
        })
          // Fade out content during transition
          .to(
            content,
            {
              opacity: 0,
              y: 20,
              duration: 0.3,
            },
            '-=0.3'
          )
          // Reset content position and fade in
          .set(content, {
            y: -20,
          })
          .to(content, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
          // Animate overlay out
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
      <TransitionOverlay ref={overlayRef} />
      <PageWrapper ref={contentRef}>{children}</PageWrapper>
    </div>
  );
};

export default PageTransition;
