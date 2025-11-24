import { useEffect, useState } from "react";
const TeamHero = () => {
     const [students, setStudents] = useState([]);
      const [mentors, setMentors] = useState([]);   

    return(
         <section className="pt-28 pb-20   text-black">
       
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-7xl  font-black mb-6">
            Know Our <span className="text-purple-600">Team</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Discover the brilliant minds and talented individuals who make our internship program exceptional. 
            From experienced mentors to ambitious students, meet the people driving innovation forward.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 rounded-2xl bg-gray-900 p-10  max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-white">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-white">Talented Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-white">Domains Covered</div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default TeamHero;