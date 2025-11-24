const AboutMeetTeam = () => {
    return(
         <section 
        className="fade-in-section max-w-7xl mx-auto px-6 py-24 text-center relative z-10"
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
    )
}

export default AboutMeetTeam;