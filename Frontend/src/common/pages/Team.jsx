import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../../utils/axiosInstance";
import TeamHero from "../components/Team/TeamHero";
import TeamMentors from "../components/Team/TeamMentors";

const Team = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  // ⭐ FILTER STATES
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // ⭐ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  const fetchStudents = async () => {
    try {
      const { data } = await axiosInstance.get("/student/all");
      setStudents(data);
    } catch (err) {
      console.error("Error loading student profiles:", err);
    }
  };

  // Load mentors created by admin
  const fetchMentors = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/public-mentors");
      setMentors(data);
    } catch (err) {
      console.error("Failed to load mentors:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchMentors();
  }, []);

  // ⭐ Apply Search + Filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      filterDomain === "" || student.internshipDomain === filterDomain;

    const matchesBranch =
      filterBranch === "" || student.branch === filterBranch;

    const matchesYear =
      filterYear === "" || student.year === filterYear;

    return matchesSearch && matchesDomain && matchesBranch && matchesYear;
  });

  // ⭐ Pagination Logic After Filtering
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-50 to-indigo-100 overflow-hidden relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        ></div>
        <div 
          className="absolute top-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <Navbar />

      {/* Hero Section */}
    <TeamHero/>

      {/* ⭐ MENTORS SECTION WITH SLIDING CARDS */}
      <TeamMentors/>
      
      {/* ⭐ SEARCH & FILTERS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Discover Our <span className="text-purple-600">Students</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find talented students across various domains, branches, and years. Filter and connect with future innovators.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/60">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="w-full bg-white border border-gray-300 rounded-2xl pl-10 pr-4 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                value={search}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>

            {/* Filter Domain */}
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-4 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 appearance-none"
                value={filterDomain}
                onChange={(e) => {
                  setCurrentPage(1);
                  setFilterDomain(e.target.value);
                }}
              >
                <option value="">All Domains</option>
                {[...new Set(students.map((s) => s.internshipDomain))].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Filter Branch */}
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-4 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 appearance-none"
                value={filterBranch}
                onChange={(e) => {
                  setCurrentPage(1);
                  setFilterBranch(e.target.value);
                }}
              >
                <option value="">All Branches</option>
                {[...new Set(students.map((s) => s.branch))].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Filter Year */}
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-4 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 appearance-none"
                value={filterYear}
                onChange={(e) => {
                  setCurrentPage(1);
                  setFilterYear(e.target.value);
                }}
              >
                <option value="">All Years</option>
                {[...new Set(students.map((s) => s.year))].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearch("");
                setFilterBranch("");
                setFilterYear("");
                setFilterDomain("");
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl px-6 py-4 hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* ⭐ STUDENTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {currentStudents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Students Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search criteria or filters to find more students.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilterBranch("");
                setFilterYear("");
                setFilterDomain("");
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentStudents.map((s) => (
                <div
                  key={s._id}
                  className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group border border-purple-100"
                >
                  {/* Gradient Header */}
                  <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                  
                  <div className="p-8">
                    {/* Student Image */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            s.name
                          )}&size=128&background=6366F1&color=fff&bold=true`}
                          alt={s.name}
                          className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white group-hover:border-purple-200 transition-all duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Student Info */}
                    <h4 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {s.name}
                    </h4>
                    <p className="text-gray-600 text-center mb-6 font-medium">{s.email}</p>

                    {/* Details Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><strong>College:</strong> {s.college}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><strong>Branch:</strong> {s.branch}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><strong>Year:</strong> {s.year}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><strong>Domain:</strong> {s.internshipDomain}</span>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    {/* <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Profile</span>
                    </button> */}
                  </div>
                </div>
              ))}
            </div>

            {/* ⭐ PAGINATION */}
            <div className="flex justify-center items-center mt-16 space-x-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === 1 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="bg-white rounded-2xl shadow-lg px-6 py-3 border border-purple-100">
                <span className="font-bold text-gray-700">
                  Page <span className="text-purple-600">{currentPage}</span> of <span className="text-purple-600">{totalPages}</span>
                </span>
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === totalPages 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Team;