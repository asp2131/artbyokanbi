import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  display: flex;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 95%;
  max-width: 1200px;
  height: auto;
  max-height: 90vh;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  overflow: hidden;

  @media (max-width: 968px) {
    flex-direction: column;
    width: 90%;
    max-height: 85vh;
  }
`;

const ImageWrapper = styled.div`
  flex: 1.5;
  min-height: 400px;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);

  @media (max-width: 968px) {
    min-height: 300px;
    max-height: 50vh;
    padding: 20px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

const DescriptionWrapper = styled.div`
  flex: 1;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;

  @media (max-width: 968px) {
    padding: 40px 30px;
  }
`;

const ArtTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
  letter-spacing: -0.5px;

  @media (max-width: 968px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.85);

  @media (max-width: 968px) {
    font-size: 16px;
  }
`;

const ArtDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  gap: 10px;

  span:first-child {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    min-width: 80px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.9);
  }
`;

const Modal = ({ isOpen, onClose, imageSrc, description }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(
    () => {
      if (isOpen && modalRef.current && contentRef.current) {
        // Backdrop fade in
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        // Modal content animation - scale and rotate effect
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

        // Image slide and fade in
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.3 }
          );
        }

        // Description slide from right
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
        <ModalWrapper
          ref={modalRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          onClick={handleClose}
        >
          <ModalContent ref={contentRef} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose}>✕</CloseButton>
            <ImageWrapper>
              <Image ref={imageRef} src={imageSrc} alt="Artwork" />
            </ImageWrapper>
            <DescriptionWrapper ref={descriptionRef}>
              <ArtTitle>Original Artwork</ArtTitle>
              <Description>{description}</Description>
              <ArtDetails>
                <DetailItem>
                  <span>Artist:</span>
                  <span>Okanbi Ifatola</span>
                </DetailItem>
                <DetailItem>
                  <span>Medium:</span>
                  <span>Mixed Media</span>
                </DetailItem>
                <DetailItem>
                  <span>Year:</span>
                  <span>2023</span>
                </DetailItem>
              </ArtDetails>
            </DescriptionWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
