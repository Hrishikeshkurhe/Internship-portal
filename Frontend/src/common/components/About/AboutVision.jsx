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
            <div className="fade-in-section bg-gray-300 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-2"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '0ms'
                 }}>
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🌟
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">Our Vision</h3>
              <p className="text-black leading-relaxed text-lg">
                To become India's most trusted and impactful internship training platform,
                empowering every student with industry-ready knowledge and hands-on skills 
                that transform them into sought-after professionals in the global tech landscape.
              </p>
            </div>

            <div className="fade-in-section bg-gray-300 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-2"
                 style={{
                   opacity: 0,
                   transform: 'translateY(30px)',
                   transition: 'all 0.6s ease-out',
                   transitionDelay: '200ms'
                 }}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-black mb-4 text-purple-600">Our Mission</h3>
              <p className="text-black leading-relaxed text-lg">
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