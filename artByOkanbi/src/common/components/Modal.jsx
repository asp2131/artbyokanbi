import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 90%;
  max-width: 800px;
  height: 80%;
  max-height: 600px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 80%;
    height: 90%;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  border-radius: 10px;
  object-fit: cover;
  position: absolute;

`;

const DescriptionWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const Modal = ({ isOpen, onClose, imageSrc, description }) => {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
        >
          <ModalContent>
            <ImageWrapper>
              <Image src={imageSrc} />
            </ImageWrapper>
            <DescriptionWrapper>
              <CloseButton onClick={onClose}>X</CloseButton>
              <Description>{description}</Description>
            </DescriptionWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
