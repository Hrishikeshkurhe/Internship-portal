import React from "react";
import { Link } from "react-router-dom";

const AboutWhy = () => {
    return(
         <section 
        className="fade-in-section py-24  backdrop-blur-lg relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold mb-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Why We're Different</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-purple-600">ClickInnovate?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another training platform. We're your career partners in success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💼",
                title: "Industry-Level Internships",
                description: "Work on real projects, gain real experience, and build your portfolio with guidance from expert mentors.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "👨‍🏫",
                title: "Personalized Mentorship",
                description: "Our mentors are industry professionals who guide students step by step in their chosen domains.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "🎯",
                title: "Job & Career Support",
                description: "Resume building, mock interviews, LinkedIn optimization, and placement assistance to kickstart your career.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="fade-in-section group bg-white rounded-3xl shadow-2xl hover:shadow-3xl p-8 border border-purple-100 transition-all duration-500 hover:-translate-y-2"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 group-hover:text-purple-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-purple-600 font-semibold transition-transform duration-300 group-hover:translate-x-2">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}

export default AboutWhy;