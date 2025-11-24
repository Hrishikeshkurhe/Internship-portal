const AboutCTA = () => {
    (

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
    )
}

export default AboutCTA;