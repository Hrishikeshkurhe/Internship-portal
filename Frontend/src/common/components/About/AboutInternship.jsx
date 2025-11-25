import React from "react";
import { Link } from "react-router-dom";

const AboutInternship = () => {
    return(
      <section 
        className="fade-in-section max-w-7xl mx-auto px-6 py-24 relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold mb-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <span>Our Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Internships We <span className="text-purple-600">Offer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our internship programs are designed with modern industry standards in mind, 
            ensuring students gain hands-on skills that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: "Web Development", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              ), 
              projects: "45+ Live Projects" 
            },
            { 
              name: "UI/UX Design", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ), 
              projects: "30+ Design Sprints" 
            },
            { 
              name: "Data Science", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ), 
              projects: "25+ Real Datasets" 
            },
            { 
              name: "Cloud & DevOps", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              ), 
              projects: "20+ Deployments" 
            },
            { 
              name: "AI & Machine Learning", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ), 
              projects: "15+ AI Models" 
            },
            { 
              name: "Salesforce", 
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ), 
              projects: "10+ CRM Projects" 
            },
          ].map((intern, index) => (
            <div
              key={index}
              className="fade-in-section group bg-gradient-to-br from-white to-purple-50 border-l-4 border-purple-500 p-6 rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-purple-600 hover:shadow-2xl"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.6s ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  {intern.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                  {intern.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Live projects • Step-by-step guidance • Portfolio building
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 text-sm font-semibold">{intern.projects}</span>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}

export default AboutInternship;