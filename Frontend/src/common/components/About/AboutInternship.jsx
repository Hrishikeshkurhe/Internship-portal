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
            { name: "Web Development", icon: "🌐", projects: "45+ Live Projects" },
            { name: "UI/UX Design", icon: "🎨", projects: "30+ Design Sprints" },
            { name: "Data Science", icon: "📊", projects: "25+ Real Datasets" },
            { name: "Cloud & DevOps", icon: "☁️", projects: "20+ Deployments" },
            { name: "AI & Machine Learning", icon: "🤖", projects: "15+ AI Models" },
            { name: "Salesforce", icon: "⚡", projects: "10+ CRM Projects" },
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
                <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
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

export default AboutInternship ;