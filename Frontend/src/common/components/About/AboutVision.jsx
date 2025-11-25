const AboutVision = () => {
    return(
         <section 
        className="fade-in-section py-24 text-black relative z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Our Vision & <span className="text-purple-600">Mission</span>
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Driving innovation in education and empowering the next generation of tech leaders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="fade-in-section bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-lg rounded-3xl p-8 border border-yellow-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '0ms'
                 }}>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become India's most trusted and impactful internship training platform,
                empowering every student with industry-ready knowledge and hands-on skills 
                that transform them into sought-after professionals in the global tech landscape.
              </p>
            </div>

            <div className="fade-in-section bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-lg rounded-3xl p-8 border border-purple-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '200ms'
                 }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-purple-600">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To offer affordable, accessible, and high-quality technical education 
                through practical internships, expert mentorship, and industry-recognized 
                certification programs that bridge the gap between academia and real-world 
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}

export default AboutVision;