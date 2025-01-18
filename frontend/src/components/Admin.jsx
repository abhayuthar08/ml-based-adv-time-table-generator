import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
  animation: fadeIn 2s ease-in;
`;

const InstructionSection = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: slideUp 1s ease-in-out;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #fda085;
  padding-bottom: 10px;
`;

const SectionText = styled.p`
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 15px 0;
  text-align: justify;
`;

const Button = styled.button`
  padding: 14px 30px;
  background-color: #fda085;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
  &:hover {
    background-color: #f6d365;
  }
`;

const AnimatedImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 20px;
  animation: fadeIn 2s ease-in;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckIcon = styled.span`
  color: green;
  font-size: 1.5rem;
  margin-right: 10px;
`;

// Animations
const fadeIn = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const slideUp = `
  @keyframes slideUp {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

const Admin = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Container>
      <Title>Admin Instructions</Title>

      {/* Getting Started Section */}
      <InstructionSection>
        <SectionTitle>Getting Started</SectionTitle>
        <SectionText>
          Welcome to SchedulifyX! This platform allows you to generate
          conflict-free timetables for schools and colleges. To get started,
          follow the instructions below to configure your system.
        </SectionText>
        <Button onClick={() => handleSectionClick("how-to-use")}>
          Next: How to Use
        </Button>
      </InstructionSection>

      {/* How to Use Section */}
      {activeSection === "how-to-use" && (
        <InstructionSection>
          <SectionTitle>How to Use the App</SectionTitle>
          <SectionText>
            The system requires the following steps to generate a timetable:
            <List>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Configure your college name and branch.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Define the working days and class
                timings.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Add subjects and assign teachers.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Set room and class duration details.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Generate and review the timetable.
              </ListItem>
            </List>
          </SectionText>
          <Button onClick={() => handleSectionClick("key-features")}>
            Next: Key Features
          </Button>
        </InstructionSection>
      )}

      {/* Key Features Section */}
      {activeSection === "key-features" && (
        <InstructionSection>
          <SectionTitle>Key Features</SectionTitle>
          <SectionText>
            Some of the key features of the SchedulifyX platform include:
            <List>
              <ListItem>
                <CheckIcon>✔</CheckIcon> AI-powered timetable generation.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Conflict-free scheduling.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Real-time timetable updates.
              </ListItem>
              <ListItem>
                <CheckIcon>✔</CheckIcon> Easy to use and intuitive interface.
              </ListItem>
            </List>
          </SectionText>
          <Button onClick={() => handleSectionClick("support")}>
            Next: Support & Help
          </Button>
        </InstructionSection>
      )}

      {/* Support Section */}
      {activeSection === "support" && (
        <InstructionSection>
          <SectionTitle>Support & Help</SectionTitle>
          <SectionText>
            If you need help or encounter any issues while using the platform,
            you can reach out to the support team via the contact section in
            the admin panel or visit our help center for more resources.
          </SectionText>
          <AnimatedImage src="https://via.placeholder.com/800x400" alt="Support" />
          <Button onClick={() => handleSectionClick("getting-started")}>
            Back to Start
          </Button>
        </InstructionSection>
      )}
    </Container>
  );
};

export default Admin;
