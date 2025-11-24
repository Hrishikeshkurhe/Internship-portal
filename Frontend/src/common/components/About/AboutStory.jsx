import React from "react";
import { Link } from "react-router-dom";

const AboutStory = () =>{

  
  return(
     <section 
        className="fade-in-section max-w-7xl mx-auto px-6 py-24 relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold mb-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-purple-600">Story</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                ClickInnovate was founded with a simple yet powerful mission — to bridge the critical gap 
                between academic learning and industry expectations. We recognized that thousands of brilliant 
                students graduate each year with solid theoretical knowledge but lack the practical exposure 
                needed to thrive in today's competitive job market.
              </p>
              <p>
                That's where ClickInnovate makes the difference. We've built a robust ecosystem that brings 
                together industry experts, seasoned engineers, dedicated mentors, and forward-thinking hiring 
                partners to provide students with immersive hands-on learning experiences.
              </p>
              <p>
                Through real-time projects, industry-recognized certifications, and comprehensive placement 
                assistance, we're not just training students — we're launching careers.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105"
                 style={{ transform: 'rotate(3deg)' }}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-6xl font-black text-yellow-300 mb-4">"</div>
                <p className="text-xl font-medium mb-6">
                  We believe every student deserves the opportunity to turn their passion into profession 
                  and their dreams into reality.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">CI</span>
                  </div>
                  <div>
                    <div className="font-semibold">ClickInnovate Team</div>
                    <div className="text-purple-200 text-sm">Pioneers in Education</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


  )

}

export default AboutStory ;