import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Wrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom right, #ff9a9e, #fad0c4);
  min-height: 100vh;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 60px;
  text-align: center;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  color: white;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  max-width: 600px;
`;

const AboutSection = styled.div`
  background: white;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

const AboutContent = styled.div`
  max-width: 800px;
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
`;

const TeamSection = styled.div`
  padding: 60px 20px 100px;
  background: #fff7e6;
  text-align: center;
`;

const TeamHeading = styled.h2`
  font-size: 2.5rem;
  color: #f67280;
  margin-bottom: 50px;
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 15px;
  width: 240px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
`;

const CardImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffafbd;
  margin-bottom: 15px;
`;

const CardName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
`;

const CardRole = styled.p`
  font-size: 0.95rem;
  color: #777;
`;

// Data
const teamMembers = [
  {
    name: "Abhay Suthar",
    role: "MERN Stack Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Radhe Dave",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Vishal Suthar",
    role: "Backend Developer",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Devarsh Shah",
    role: "Full Stack Developer",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const AboutUs = () => {
  return (
    <Wrapper>
      <HeroSection>
        <HeroTitle initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Welcome to Schedulify-X
        </HeroTitle>
        <HeroSubtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          We help you manage your schedule smarter, faster, and better.
        </HeroSubtitle>
      </HeroSection>

      <AboutSection>
        <AboutContent>
          <p>
            <strong>Schedulify-X</strong> is built to make life easier — helping students, professionals,
            and organizers streamline their day. With a beautiful interface and seamless features, our mission is to simplify scheduling with style.
          </p>
          <p>
            Backed by a dedicated team of developers, we believe in building technology that empowers people.
            Whether it’s for class timetables, appointments, or meetings — we’ve got your back.
          </p>
        </AboutContent>
      </AboutSection>

      <TeamSection>
        <TeamHeading>Meet Our Team</TeamHeading>
        <TeamGrid>
          {teamMembers.map((member, idx) => (
            <Card key={idx} whileHover={{ scale: 1.05 }}>
              <CardImage src={member.img} />
              <CardName>{member.name}</CardName>
              <CardRole>{member.role}</CardRole>
            </Card>
          ))}
        </TeamGrid>
      </TeamSection>
    </Wrapper>
  );
};

export default AboutUs;
