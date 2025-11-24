import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.fade-in-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        ></div>
        <div 
          className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s'
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s'
          }}
        ></div>
      </div>

      {/* HEADER */}
      <section 
        className={`relative pt-28 pb-32 bg-gradient-to-br from-purple-400 to-indigo-600 text-white overflow-hidden transition-all duration-1000 z-10 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div 
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20 mb-8 transition-all duration-500 hover:scale-105"
            style={{
              animation: 'bounce 2s infinite'
            }}
          >
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">Transforming Careers Since 2023</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            About <span className="text-gray-900">ClickInnovate</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Empowering students with real-world skills, expert mentorship, and 
            career-ready experiences through high-quality internships & training.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { number: "5000+", label: "Students Trained" },
              { number: "200+", label: "Partner Companies" },
              { number: "50+", label: "Expert Mentors" },
              { number: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transition-all duration-300 hover:scale-110 fade-in-section"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="text-3xl md:text-4xl font-black text-yellow-300 mb-2">{stat.number}</div>
                <div className="text-purple-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{
            animation: 'bounce 2s infinite'
          }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* SECTION: OUR STORY */}
      <section 
        className="fade-in-section max-w-6xl mx-auto px-6 py-24 relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

      {/* SECTION: WHY CHOOSE US */}
      <section 
        className="fade-in-section py-24 bg-white/80 backdrop-blur-lg relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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

      {/* SECTION: INTERNSHIPS */}
      <section 
        className="fade-in-section max-w-6xl mx-auto px-6 py-24 relative z-10"
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

      {/* SECTION: VISION & MISSION */}
      <section 
        className="fade-in-section py-24 bg-gradient-to-br from-purple-600 to-indigo-700 text-white relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Our Vision & <span className="text-yellow-300">Mission</span>
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Driving innovation in education and empowering the next generation of tech leaders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="fade-in-section bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-2"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '0ms'
                 }}>
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🌟
              </div>
              <h3 className="text-2xl font-black mb-4 text-yellow-300">Our Vision</h3>
              <p className="text-purple-100 leading-relaxed text-lg">
                To become India's most trusted and impactful internship training platform,
                empowering every student with industry-ready knowledge and hands-on skills 
                that transform them into sought-after professionals in the global tech landscape.
              </p>
            </div>

            <div className="fade-in-section bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-2"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '200ms'
                 }}>
              <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-black mb-4 text-green-300">Our Mission</h3>
              <p className="text-purple-100 leading-relaxed text-lg">
                To offer affordable, accessible, and high-quality technical education 
                through practical internships, expert mentorship, and industry-recognized 
                certification programs that bridge the gap between academia and real-world 
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OUR TEAM */}
      <section 
        className="fade-in-section max-w-6xl mx-auto px-6 py-24 text-center relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-purple-100">
          <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold mb-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <span>Meet the Experts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Meet Our <span className="text-purple-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            A passionate group of educators, engineers, mentors, and innovators 
            committed to transforming student careers and shaping the future of tech education.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 max-w-md mx-auto transition-all duration-300 hover:scale-105">
            <p className="text-gray-700 mb-6">
              You can view our mentor profiles on the 
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:from-purple-600 hover:to-indigo-600 hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="font-black">"Know Our Team"</span> page
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="fade-in-section py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with ClickInnovate. 
            Your future in tech starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:bg-purple-50 hover:scale-105 shadow-2xl">
              Explore Internships
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:bg-white hover:text-purple-600 hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}