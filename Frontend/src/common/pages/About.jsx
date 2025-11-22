import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      {/* HEADER */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ClickInnovate</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Empowering students with real-world skills, expert mentorship, and 
          career-ready experiences through high-quality internships & training.
        </p>
      </section>

      {/* SECTION: OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          ClickInnovate was founded with a simple mission — to bridge the gap 
          between academic learning and industry expectations. We realized that 
          thousands of students graduate every year with theoretical knowledge 
          but lack the practical exposure required to succeed in their careers.
          <br /><br />
          That’s where ClickInnovate comes in.  
          We collaborate with industry experts, engineers, mentors, and hiring 
          partners to provide students with hands-on learning experiences, 
          real-time projects, certifications, and placement assistance.
        </p>
      </section>

      {/* SECTION: WHY CHOOSE US */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose ClickInnovate?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-xl text-indigo-600 mb-3">
              ✔ Industry-Level Internships
            </h3>
            <p className="text-gray-600">
              Work on real projects, gain real experience, and build your 
              portfolio with guidance from expert mentors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-xl text-indigo-600 mb-3">
              ✔ Personalized Mentorship
            </h3>
            <p className="text-gray-600">
              Our mentors are industry professionals who guide students step by 
              step in their chosen domains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="font-semibold text-xl text-indigo-600 mb-3">
              ✔ Job & Career Support
            </h3>
            <p className="text-gray-600">
              Resume building, mock interviews, LinkedIn optimization, and 
              placement assistance to kickstart your career.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Internships We Offer</h2>
        <p className="text-gray-600 text-lg mb-10">
          Our internship programs are designed with modern industry standards 
          in mind, ensuring students gain hands-on skills that matter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            "Web Development",
            "UI/UX Design",
            "Data Science",
            "Cloud & DevOps",
            "AI & Machine Learning",
            "Salesforce",
          ].map((intern, i) => (
            <div
              key={i}
              className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold text-indigo-700">{intern}</h3>
              <p className="text-gray-600 text-sm mt-2">
                Live projects • Step-by-step guidance • Portfolio building
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: VISION & MISSION */}
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Our Vision & Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">🌟 Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India’s most trusted and impactful internship training platform,
                empowering every student with industry-ready knowledge and hands-on skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">🚀 Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To offer affordable, accessible, and high-quality technical education 
                through practical internships, expert mentors, and certification programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OUR TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Meet Our Team
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
          A passionate group of educators, engineers, mentors, and innovators 
          committed to transforming student careers.
        </p>

        <div className="text-center text-gray-600">
          <p>You can view our mentor profiles on the <b>“Know Our Team”</b> page.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

