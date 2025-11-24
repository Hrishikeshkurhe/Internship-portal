// common/components/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);  // ✅ FIXED
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative pt-28 pb-32 text-gray-800 overflow-hidden transition-all duration-1000 z-10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative  max-w-7xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center space-x-3 ml-60 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20 mb-8 transition-all duration-500 hover:scale-105"
          style={{ animation: "bounce 2s infinite" }}
        >
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="font-semibold  text-m">
            Transforming Careers Since 2023
          </span>
        </div>

        <h1 className="text-7xl font-black mb-6 ">
          About <span className="text-purple-600">ClickInnovate</span>
        </h1>

        <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
          Empowering students with real-world skills, expert mentorship, and
          career-ready experiences through high-quality internships & training.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 bg-gray-900 rounded-2xl p-10 max-w-2xl mx-auto">
          {[
            { number: "5000+", label: "Students Trained" },
            { number: "200+", label: "Partner Companies" },
            { number: "50+", label: "Expert Mentors" },
            { number: "98%", label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center transition-all duration-300 hover:scale-110 fade-in-section"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease-out",
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-purple-200 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>   
    </section>
  );
};

export default AboutHero;
