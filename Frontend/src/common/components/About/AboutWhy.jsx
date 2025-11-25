import React from "react";
import { Link } from "react-router-dom";

const AboutWhy = () => {
    return(
         <section 
        className="fade-in-section py-24 backdrop-blur-lg relative z-10"
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
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                ),
                title: "Industry-Level Internships",
                description: "Work on real projects, gain real experience, and build your portfolio with guidance from expert mentors.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Personalized Mentorship",
                description: "Our mentors are industry professionals who guide students step by step in their chosen domains.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
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
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110`}>
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