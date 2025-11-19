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
      <section className="py-20 bg-white">
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
