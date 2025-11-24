
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
const TeamMentors = () => {
    const [mentors, setMentors] = useState([]);

      const fetchMentors = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/public-mentors");
      setMentors(data);
    } catch (err) {
      console.error("Failed to load mentors:", err);
    }
  };

  useEffect(() => {
    
    fetchMentors();
  }, []);
    return(
        <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Our <span className="text-purple-600">Expert Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from industry professionals with years of experience and passion for mentoring the next generation of talent.
          </p>
        </div>

        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Mentors Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Our mentor team is being assembled. Check back soon to meet our industry experts!
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Sliding Cards Container */}
            <div className="flex overflow-x-auto pb-8 scrollbar-hide space-x-6 snap-x snap-mandatory">
              {mentors.map((m, index) => (
                <div
                  key={m._id}
                  className="flex-shrink-0 w-80 snap-center transform transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group border border-purple-100">
                    {/* Gradient Header */}
                    <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                    
                    <div className="p-8 text-center">
                      {/* Mentor Image */}
                      <div className="relative inline-block mb-6">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            m.name
                          )}&background=6366F1&color=fff&size=128&bold=true&font-size=0.5`}
                          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-2xl group-hover:border-purple-200 transition-all duration-300"
                          alt={m.name}
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Mentor Info */}
                      <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {m.name}
                      </h4>
                      <p className="text-gray-600 mb-4 font-medium">{m.email}</p>

                      {/* Internships */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                        <h5 className="font-bold text-purple-700 mb-2 flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>Expert In</span>
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {Array.isArray(m.INTERNSHIPAssigned) && m.INTERNSHIPAssigned.length > 0
                            ? m.INTERNSHIPAssigned.join(", ")
                            : m.courseAssigned || "Multiple Domains"}
                        </p>
                      </div>

                      {/* Contact Button */}
                      <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Connect</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {mentors.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 bg-purple-300 rounded-full transition-all duration-300 hover:bg-purple-500 cursor-pointer"
                ></div>
              ))}
            </div>
          </div>
        )}
      </section>
    )
}

export default TeamMentors ;