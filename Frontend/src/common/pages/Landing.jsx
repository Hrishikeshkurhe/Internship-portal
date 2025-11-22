// pages/Landing.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

import Hero from "../../common/components/Hero";
import CourseCard from "../../common/components/CourseCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Navbar />
      <Hero />

      {/* Featured Courses Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-50 to-indigo-100 overflow-hidden ">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed to kickstart your career 
              in the tech industry
            </p>
          </div>

          {/* Show ONLY FIRST 3 courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map(course => (
              <CourseCard key={course._id} {...course} />
            ))}

            {courses.length === 0 && (
              <p className="text-center text-gray-600 col-span-3">
                No featured courses available right now.
              </p>
            )}
          </div>

          {/* VIEW ALL COURSES BUTTON */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/internships")}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Internships
            </button>
          </div>

        </div>
      </section>

            {/* ABOUT US SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-purple-50 to-indigo-100 overflow-hidden ">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="About ClickInnovate"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              About ClickInnovate
            </h2>

            <p className="text-gray-600 leading-7 mb-6">
              ClickInnovate is dedicated to empowering students by providing 
              hands-on internships, industry-relevant training, and real-time 
              mentorship. Our goal is to bridge the gap between academics and 
              industry by helping learners gain practical skills and experience 
              that accelerate their career growth.
            </p>

            <p className="text-gray-600 leading-7 mb-8">
              With expert mentors, structured learning programs, real-world 
              projects, and professional certification, ClickInnovate has helped 
              thousands of students become job-ready in highly competitive fields 
              like Web Development, Data Science, AI, Cloud, Cybersecurity, and more.
            </p>

            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
              text-white rounded-lg font-semibold shadow-lg hover:scale-105 
              transition-transform duration-300"
            >
              Know More
            </button>
          </div>

        </div>
      </section>

       {/* Know our team */}
             {/* KNOW OUR TEAM SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-purple-50 to-indigo-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Know Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Meet our passionate mentors who guide students, build careers, 
            and help shape the future through hands-on training and real world learning.
          </p>

          {/* TEAM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CARD 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all text-center">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Mentor"
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700">Rahul Sharma</h3>
              <p className="text-gray-600">UI/UX Developer</p>
              <p className="text-gray-500 mt-2 text-sm">Figma • Adobe XD • Wireframing • App UI</p>
            </div>

            {/* CARD 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all text-center">
              <img
                src="https://i.pravatar.cc/150?img=20"
                alt="Mentor"
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700">Priya Verma</h3>
              <p className="text-gray-600">Data Science Mentor</p>
              <p className="text-gray-500 mt-2 text-sm">Python • ML • AI • PowerBI</p>
            </div>

            {/* CARD 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all text-center">
              <img
                src="https://i.pravatar.cc/150?img=33"
                alt="Mentor"
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-700">Kiran Khakare</h3>
              <p className="text-gray-600">Senior Full Stack Developer</p>
              <p className="text-gray-500 mt-2 text-sm">React • NodeJS • MongoDB • Cloud</p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/team")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white rounded-lg font-semibold shadow-lg hover:scale-105 
              transition-transform duration-300"
            >
              Meet the Full Team
            </button>
          </div>

        </div>
      </section>
  
      {/* Achievment Section */}
            {/* CLICKINNOVATE ACHIEVEMENTS SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-purple-50 to-indigo-100  text-black overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-4xl font-bold text-center mb-6">
            ClickInnovate Achievements
          </h2>

          <p className="text-center text-purple-900 max-w-2xl mx-auto mb-14">
            We’re proud of the impact we’ve created by skill-building, guiding 
            and empowering thousands of students to become future-ready.
          </p>

          {/* ACHIEVEMENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">

            {/* Card 1 */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">🎓</div>
              <h3 className="text-4xl font-bold">10,000+</h3>
              <p className="text-purple-900 mt-2 text-lg">Students Trained</p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">💼</div>
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="text-purple-900 mt-2 text-lg">Internships Completed</p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">🌍</div>
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-purple-900 mt-2 text-lg">Domains Offered</p>
            </div>

            {/* Card 4 */}
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-4xl font-bold">4.9/5</h3>
              <p className="text-purple-900 mt-2 text-lg">Student Rating</p>
            </div>

          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students who have transformed their careers with our courses
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
      

      <Footer />
    </div>
  );
};

export default Landing;
