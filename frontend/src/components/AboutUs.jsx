// // import React from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";

// // // Styled Components
// // const Container = styled.div`
// //   padding: 50px;
// //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// //   min-height: 100vh;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const Title = styled(motion.h1)`
// //   font-size: 3rem;
// //   color: #fff;
// //   text-align: center;
// //   margin-bottom: 30px;
// // `;

// // const SubTitle = styled(motion.h2)`
// //   font-size: 1.5rem;
// //   color: #fff;
// //   text-align: center;
// //   margin-bottom: 40px;
// // `;

// // const Content = styled(motion.div)`
// //   max-width: 800px;
// //   background: rgba(255, 255, 255, 0.9);
// //   border-radius: 15px;
// //   padding: 30px;
// //   box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
// // `;

// // const Paragraph = styled(motion.p)`
// //   font-size: 1.1rem;
// //   color: #555;
// //   margin-bottom: 20px;
// //   line-height: 1.6;
// //   text-align: justify;
// // `;

// // const TeamContainer = styled(motion.div)`
// //   display: flex;
// //   flex-wrap: wrap;
// //   justify-content: center;
// //   gap: 20px;
// //   margin-top: 30px;
// // `;

// // const TeamMember = styled(motion.div)`
// //   background: linear-gradient(135deg, #fda085, #f6d365);
// //   border-radius: 10px;
// //   padding: 20px;
// //   width: 200px;
// //   text-align: center;
// //   color: #fff;
// //   box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
// // `;

// // const Name = styled.h3`
// //   font-size: 1.2rem;
// //   margin-bottom: 10px;
// // `;

// // const Role = styled.p`
// //   font-size: 1rem;
// //   opacity: 0.8;
// // `;

// // const Button = styled(motion.button)`
// //   margin-top: 40px;
// //   padding: 15px 30px;
// //   background: linear-gradient(135deg, #6dd5ed, #2193b0);
// //   color: white;
// //   font-size: 1rem;
// //   font-weight: bold;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
// //   &:hover {
// //     background: linear-gradient(135deg, #2193b0, #6dd5ed);
// //   }
// // `;

// // const teamMembers = [
// //   { name: "Abhay Suthar", role: "MERN Dev" },
// //   { name: "Radhe Dave", role: "Dev" },
// //   { name: "Vishal Suthar", role: "Dev" },
// //   { name: "Devarsh Shah", role: "Dev" },
// // ];

// // // Animation Variants
// // const fadeIn = {
// //   hidden: { opacity: 0 },
// //   visible: { opacity: 1, transition: { duration: 1 } },
// // };

// // const slideUp = {
// //   hidden: { opacity: 0, y: 50 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// // };

// // const AboutUs = () => {
// //   return (
// //     <Container>
// //       <Title
// //         initial="hidden"
// //         animate="visible"
// //         variants={fadeIn}
// //       >
// //         About Us
// //       </Title>
// //       <SubTitle
// //         initial="hidden"
// //         animate="visible"
// //         variants={fadeIn}
// //         transition={{ delay: 0.5 }}
// //       >
// //         Building the future, one step at a time
// //       </SubTitle>
// //       <Content
// //         initial="hidden"
// //         animate="visible"
// //         variants={slideUp}
// //       >
// //         <Paragraph>
// //           Welcome to <strong>Schedulify-X</strong>, your one-stop solution for
// //           creating and managing schedules effortlessly. Our mission is to
// //           simplify the process of timetable generation with smart algorithms and
// //           user-friendly designs.
// //         </Paragraph>
// //         <Paragraph>
// //           Founded by a team of passionate individuals, we believe that time is
// //           the most valuable asset. By optimizing schedules, we aim to save your
// //           time so you can focus on what truly matters.
// //         </Paragraph>
// //       </Content>
// //       <TeamContainer
// //         initial="hidden"
// //         animate="visible"
// //         variants={fadeIn}
// //         transition={{ delay: 1 }}
// //       >
// //         {teamMembers.map((member, index) => (
// //           <TeamMember
// //             key={index}
// //             whileHover={{ scale: 1.05 }}
// //             transition={{ type: "spring", stiffness: 200 }}
// //           >
// //             <Name>{member.name}</Name>
// //             <Role>{member.role}</Role>
// //           </TeamMember>
// //         ))}
// //       </TeamContainer>
// //       <Button
// //         whileHover={{ scale: 1.1 }}
// //         whileTap={{ scale: 0.95 }}
// //         onClick={() => alert("Learn More Coming Soon!")}
// //       >
// //         Learn More
// //       </Button>
// //     </Container>
// //   );
// // };

// // export default AboutUs;


// import React from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";

// // Styled Components
// const Container = styled.div`
//   padding: 60px 20px;
//   background: linear-gradient(to right, #1e3c72, #2a5298);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled(motion.h1)`
//   font-size: 3.5rem;
//   font-weight: bold;
//   color: #f5f5f5;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const SubTitle = styled(motion.h2)`
//   font-size: 1.7rem;
//   font-weight: 300;
//   color: #e0e0e0;
//   margin-bottom: 40px;
//   text-align: center;
// `;

// const Content = styled(motion.div)`
//   max-width: 900px;
//   background: rgba(255, 255, 255, 0.12);
//   border: 1px solid rgba(255, 255, 255, 0.15);
//   border-radius: 20px;
//   padding: 40px;
//   backdrop-filter: blur(12px);
//   color: #f0f0f0;
//   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
//   margin-bottom: 40px;
// `;

// const Paragraph = styled(motion.p)`
//   font-size: 1.2rem;
//   margin-bottom: 20px;
//   line-height: 1.8;
// `;

// const TeamContainer = styled(motion.div)`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 25px;
//   margin-bottom: 50px;
// `;

// const TeamMember = styled(motion.div)`
//   background: linear-gradient(145deg, #6dd5ed, #2193b0);
//   border-radius: 15px;
//   padding: 25px 20px;
//   width: 220px;
//   color: #fff;
//   text-align: center;
//   box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
//   transition: all 0.3s ease;
// `;

// const Name = styled.h3`
//   font-size: 1.4rem;
//   margin-bottom: 10px;
// `;

// const Role = styled.p`
//   font-size: 1rem;
//   font-style: italic;
//   opacity: 0.9;
// `;

// const Button = styled(motion.button)`
//   padding: 15px 35px;
//   background: linear-gradient(to right, #ff512f, #dd2476);
//   color: white;
//   font-size: 1.1rem;
//   font-weight: 500;
//   border: none;
//   border-radius: 50px;
//   cursor: pointer;
//   transition: 0.3s ease-in-out;
//   box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);

//   &:hover {
//     background: linear-gradient(to right, #dd2476, #ff512f);
//   }
// `;

// const teamMembers = [
//   { name: "Abhay Suthar", role: "MERN Stack Developer" },
//   { name: "Radhe Dave", role: "Frontend Developer" },
//   { name: "Vishal Suthar", role: "Backend Developer" },
//   { name: "Devarsh Shah", role: "Full Stack Developer" },
// ];

// // Animation Variants
// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1 } },
// };

// const slideUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
// };

// const staggerTeam = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const teamCard = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const AboutUs = () => {
//   return (
//     <Container>
//       <Title initial="hidden" animate="visible" variants={fadeIn}>
//         About Us
//       </Title>
//       <SubTitle
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//         transition={{ delay: 0.4 }}
//       >
//         Building the Future, One Step at a Time
//       </SubTitle>

//       <Content
//         initial="hidden"
//         animate="visible"
//         variants={slideUp}
//       >
//         <Paragraph>
//           <strong>Schedulify-X</strong> is your go-to platform for smart scheduling solutions.
//           We simplify the complex task of timetable management with intuitive UI
//           and efficient algorithms.
//         </Paragraph>
//         <Paragraph>
//           Our goal is to eliminate the stress of manual scheduling and give institutions
//           the ability to handle their routines with clarity, precision, and zero conflicts.
//         </Paragraph>
//         <Paragraph>
//           We are a team of driven developers who value innovation, performance,
//           and beautiful design. Let us help you save time — so you can focus on what matters.
//         </Paragraph>
//       </Content>

//       <TeamContainer
//         initial="hidden"
//         animate="visible"
//         variants={staggerTeam}
//       >
//         {teamMembers.map((member, index) => (
//           <TeamMember
//             key={index}
//             variants={teamCard}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Name>{member.name}</Name>
//             <Role>{member.role}</Role>
//           </TeamMember>
//         ))}
//       </TeamContainer>

//       <Button
//         whileHover={{ scale: 1.08 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => alert("More exciting features coming soon!")}
//       >
//         Learn More
//       </Button>
//     </Container>
//   );
// };

// export default AboutUs;


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
