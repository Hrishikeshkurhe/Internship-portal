// pages/Landing.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Hero from "../../common/components/Hero";
import CourseCard from "../../common/components/CourseCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import AboutStory from "../components/About/AboutStory";
import EnquiryMain from "../components/Enquiry/EnquiryMain";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const blobVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.3, 0.2],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

const Landing = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/courses");
      setCourses(data);
    } catch (err) {
      console.error("Error fetching featured courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-300 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
        ></motion.div>
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 4 }}
        ></motion.div>
      </div>
      
      <Navbar />
      <Hero />

      {/* Featured Courses Section */}
      <AnimatedSection className="relative py-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed to kickstart your career 
              in the tech industry
            </p>
          </motion.div>

          {/* Show ONLY FIRST 3 courses */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course._id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}

            {courses.length === 0 && (
              <motion.p 
                className="text-center text-gray-600 col-span-3"
                variants={itemVariants}
              >
                No featured courses available right now.
              </motion.p>
            )}
          </motion.div>

          {/* VIEW ALL COURSES BUTTON */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate("/internships")}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Internships
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ABOUT US SECTION */}
      <AnimatedSection className="relative py-20">
       
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE IMAGE */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="About ClickInnovate"
              className="rounded-2xl shadow-lg w-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* RIGHT SIDE CONTENT */}
          <motion.div
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-4"
              variants={itemVariants}
            >
              About ClickInnovate
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-2xl leading-7 mb-6"
              variants={itemVariants}
            >
              ClickInnovate is dedicated to empowering students by providing 
              hands-on internships, industry-relevant training, and real-time 
              mentorship. Our goal is to bridge the gap between academics and 
              industry by helping learners gain practical skills and experience 
              that accelerate their career growth.
            </motion.p>

            <motion.p 
              className="text-gray-600 text-2xl leading-7 mb-8"
              variants={itemVariants}
            >
              With expert mentors, structured learning programs, real-world 
              projects, and professional certification, ClickInnovate has helped 
              thousands of students become job-ready in highly competitive fields 
              like Web Development, Data Science, AI, Cloud, Cybersecurity, and more.
            </motion.p>

            <motion.button
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
              text-white rounded-lg font-semibold shadow-lg hover:scale-105 
              transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              Know More
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* KNOW OUR TEAM SECTION */}
      <AnimatedSection className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              Know Our Team
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto mb-12"
              variants={itemVariants}
            >
              Meet our passionate mentors who guide students, build careers, 
              and help shape the future through hands-on training and real world learning.
            </motion.p>
          </motion.div>

          {/* TEAM GRID */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
          >
            {[
              {
                img: "https://i.pravatar.cc/150?img=5",
                name: "Rahul Sharma",
                role: "UI/UX Developer",
                skills: "Figma • Adobe XD • Wireframing • App UI"
              },
              {
                img: "https://i.pravatar.cc/150?img=20",
                name: "Priya Verma",
                role: "Data Science Mentor",
                skills: "Python • ML • AI • PowerBI"
              },
              {
                img: "https://i.pravatar.cc/150?img=33",
                name: "Kiran Khakare",
                role: "Senior Full Stack Developer",
                skills: "React • NodeJS • MongoDB • Cloud"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all text-center"
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.img
                  src={member.img}
                  alt="Mentor"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-indigo-500 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-xl font-semibold text-indigo-700">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-500 mt-2 text-sm">{member.skills}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* BUTTON */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate("/team")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white rounded-lg font-semibold shadow-lg hover:scale-105 
              transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Meet the Full Team
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ACHIEVEMENTS SECTION */}
      <AnimatedSection className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-6"
              variants={itemVariants}
            >
              ClickInnovate Achievements
            </motion.h2>
            <motion.p 
              className="text-center text-purple-900 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              We're proud of the impact we've created by skill-building, guiding 
              and empowering thousands of students to become future-ready.
            </motion.p>
          </motion.div>

          {/* ACHIEVEMENTS GRID */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center"
            variants={containerVariants}
          >
            {[
              { emoji: "🎓", number: "10,000+", text: "Students Trained" },
              { emoji: "💼", number: "5000+", text: "Internships Completed" },
              { emoji: "🌍", number: "50+", text: "Domains Offered" },
              { emoji: "⭐", number: "4.9/5", text: "Student Rating" }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                custom={index}
              >
                <div className="text-5xl mb-3">{achievement.emoji}</div>
                <h3 className="text-4xl font-bold">{achievement.number}</h3>
                <p className="text-purple-900 mt-2 text-lg">{achievement.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <section>
        <EnquiryMain/>
      </section>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-xl text-purple-100 mb-8"
              variants={itemVariants}
            >
              Join thousands of students who have transformed their careers with our courses
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Landing;