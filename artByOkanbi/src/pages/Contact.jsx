import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 120px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const Content = styled.div`
  max-width: 800px;
  font-size: 18px;
  line-height: 1.8;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  font-size: 20px;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Title>Get in Touch</Title>
      <Content>
        <p>
          Interested in commissioning a piece or learning more about the
          available artwork? Feel free to reach out!
        </p>
        <ContactInfo>
          <ContactItem>Email: okanbi@artworks.com</ContactItem>
          <ContactItem>Instagram: @artbyokanbi</ContactItem>
          <ContactItem>Phone: +1 (555) 123-4567</ContactItem>
        </ContactInfo>
      </Content>
    </ContactContainer>
  );
};

export default Contact;
