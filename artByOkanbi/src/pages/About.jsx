import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

const About = () => {
  return (
    <AboutContainer>
      <Title>About the Artist</Title>
      <Content>
        <p>
          Okanbi Ifatola is a talented artist whose work explores the
          intersection of traditional and contemporary art forms. With a keen
          eye for detail and a passion for creative expression, Okanbi creates
          pieces that captivate and inspire.
        </p>
        <p>
          Each artwork is a reflection of unique perspectives and experiences,
          bringing together color, form, and emotion in harmonious balance.
        </p>
      </Content>
    </AboutContainer>
  );
};

export default About;
