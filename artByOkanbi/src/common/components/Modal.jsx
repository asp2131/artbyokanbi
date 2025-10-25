import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Modal = ({ isOpen, onClose, imageSrc, description }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

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
      if (isOpen && modalRef.current && contentRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        gsap.fromTo(
          contentRef.current,
          {
            scale: 0.5,
            opacity: 0,
            rotationY: -90,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.1,
          }
        );

        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.3 }
          );
        }

        if (descriptionRef.current) {
          gsap.fromTo(
            descriptionRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.4 }
          );
        }
      }
    },
    { dependencies: [isOpen], scope: modalRef }
  );

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose,
      });

      tl.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        rotationY: 90,
        duration: 0.4,
        ease: "power2.in",
      }).to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.2"
      );
    } else {
      onClose();
    }
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          onClick={handleClose}
          className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center bg-black/85 backdrop-blur-[10px] z-[9999] p-5 overflow-y-auto overscroll-contain"
        >
          <motion.div
            ref={contentRef}
            onClick={(e) => e.stopPropagation()}
            className="relative flex bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-[20px] border border-white/[0.18] w-[95%] max-w-[1200px] h-auto max-h-[90vh] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-y-auto overscroll-contain m-auto lg:flex-row flex-col lg:w-[90%] lg:max-h-[85vh] max-[480px]:w-[95%] max-[480px]:max-w-[95vw] max-[480px]:rounded-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-11 h-11 bg-white/10 backdrop-blur-[10px] border border-white/[0.18] rounded-full cursor-pointer text-xl text-white flex items-center justify-center transition-all duration-300 z-10 hover:bg-white/20 hover:rotate-90 active:rotate-90 active:scale-90"
            >
              ✕
            </button>

            <div className="flex-[1.5] min-h-[400px] max-h-[80vh] flex justify-center items-center relative p-10 bg-black/30 lg:min-h-[400px] lg:max-h-[80vh] lg:p-10 max-lg:min-h-[300px] max-lg:max-h-[50vh] max-lg:p-5 max-[480px]:min-h-[250px] max-[480px]:p-4">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Artwork"
                className="w-full h-full object-contain rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div
              ref={descriptionRef}
              className="flex-1 py-[60px] px-[50px] flex flex-col justify-center text-white relative max-lg:py-10 max-lg:px-[30px]"
            >
              <h2 className="text-[32px] font-bold mb-5 text-white tracking-[-0.5px] max-lg:text-2xl">
                Original Artwork
              </h2>
              <p className="text-lg leading-[1.8] mb-[30px] text-white/85 max-lg:text-base">
                {description}
              </p>
              <div className="flex flex-col gap-3 mt-5 pt-5 border-t border-white/20">
                <div className="flex items-center text-sm text-white/70 gap-2.5">
                  <span className="font-semibold text-white/90 min-w-[80px]">Artist:</span>
                  <span>Okanbi Ifatola</span>
                </div>
                <div className="flex items-center text-sm text-white/70 gap-2.5">
                  <span className="font-semibold text-white/90 min-w-[80px]">Medium:</span>
                  <span>Mixed Media</span>
                </div>
                <div className="flex items-center text-sm text-white/70 gap-2.5">
                  <span className="font-semibold text-white/90 min-w-[80px]">Year:</span>
                  <span>2023</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
