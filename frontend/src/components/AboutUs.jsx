import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
`;

const SubTitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
  text-align: justify;
`;

const TeamContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const TeamMember = styled(motion.div)`
  background: linear-gradient(135deg, #fda085, #f6d365);
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  text-align: center;
  color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`;

const Name = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Role = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const Button = styled(motion.button)`
  margin-top: 40px;
  padding: 15px 30px;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: linear-gradient(135deg, #2193b0, #6dd5ed);
  }
`;

const teamMembers = [
  { name: "Abhay Suthar", role: "MERN Dev" },
  { name: "Radhe Dave", role: "Dev" },
  { name: "Vishal Suthar", role: "Dev" },
  { name: "Devarsh Shah", role: "Dev" },
];

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AboutUs = () => {
  return (
    <Container>
      <Title
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        About Us
      </Title>
      <SubTitle
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.5 }}
      >
        Building the future, one step at a time
      </SubTitle>
      <Content
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <Paragraph>
          Welcome to <strong>Schedulify-X</strong>, your one-stop solution for
          creating and managing schedules effortlessly. Our mission is to
          simplify the process of timetable generation with smart algorithms and
          user-friendly designs.
        </Paragraph>
        <Paragraph>
          Founded by a team of passionate individuals, we believe that time is
          the most valuable asset. By optimizing schedules, we aim to save your
          time so you can focus on what truly matters.
        </Paragraph>
      </Content>
      <TeamContainer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 1 }}
      >
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Name>{member.name}</Name>
            <Role>{member.role}</Role>
          </TeamMember>
        ))}
      </TeamContainer>
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert("Learn More Coming Soon!")}
      >
        Learn More
      </Button>
    </Container>
  );
};

export default AboutUs;
