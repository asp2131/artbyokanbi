import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Modal = ({ isOpen, onClose, imageSrc, description }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = document.body.dataset.scrollY;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (isOpen && overlayRef.current && modalRef.current) {
        const tl = gsap.timeline();

        // Overlay fade in
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        // Modal scale and fade entrance with elastic effect
        tl.fromTo(
          modalRef.current,
          {
            scale: 0.7,
            opacity: 0,
            y: 100,
            rotationX: -15
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.1"
        );

        // Image reveal from left with scale
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            {
              x: -80,
              opacity: 0,
              scale: 0.9,
              rotationY: -20
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.7,
              ease: "power3.out"
            },
            "-=0.5"
          );
        }

        // Details slide in from right
        if (detailsRef.current) {
          tl.fromTo(
            detailsRef.current,
            {
              x: 80,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "-=0.5"
          );
        }

        // Close button pop in
        if (closeButtonRef.current) {
          tl.fromTo(
            closeButtonRef.current,
            {
              scale: 0,
              rotation: -180
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(2)"
            },
            "-=0.4"
          );
        }
      }
    },
    { dependencies: [isOpen] }
  );

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose,
      });

      // Close button spin out
      if (closeButtonRef.current) {
        tl.to(closeButtonRef.current, {
          scale: 0,
          rotation: 180,
          duration: 0.3,
          ease: "back.in(2)"
        });
      }

      // Details fade out
      if (detailsRef.current) {
        tl.to(
          detailsRef.current,
          {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
          },
          "-=0.2"
        );
      }

      // Image fade out
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          {
            x: -50,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in"
          },
          "-=0.25"
        );
      }

      // Modal scale down
      tl.to(
        modalRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
          duration: 0.4,
          ease: "power2.in"
        },
        "-=0.2"
      );

      // Overlay fade out
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2
        },
        "-=0.2"
      );
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      style={{ opacity: 0 }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:rotate-90 hover:scale-110 transition-all duration-300"
          style={{ opacity: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div
            ref={imageRef}
            className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-black/20"
            style={{ opacity: 0 }}
          >
            <img
              src={imageSrc}
              alt="Artwork"
              className="max-w-full max-h-[50vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Details Section */}
          <div
            ref={detailsRef}
            className="flex-shrink-0 w-full lg:w-[400px] p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 overflow-y-auto"
            style={{ opacity: 0 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                  Original Artwork
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                {description}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-medium">Artist</p>
                    <p className="text-base text-white">Okanbi Ifatola</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-400"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-medium">Medium</p>
                    <p className="text-base text-white">Mixed Media</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-400"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 font-medium">Year</p>
                    <p className="text-base text-white">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
