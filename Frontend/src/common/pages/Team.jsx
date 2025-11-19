import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../../utils/axiosInstance";

const Team = () => {
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    fetchStudents();
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

  const mentors = [
    { name: "Rahul Sharma", role: "UI/UX Developer", image: "https://i.pravatar.cc/150?img=5", skills: "React, NodeJS, MongoDB, Cloud" },
    { name: "Priya Verma", role: "Data Science Mentor", image: "https://i.pravatar.cc/150?img=47", skills: "Python, ML, AI, PowerBI" },
    { name: "Kiran Khakare", role: "Senior Full Stack Developer", image: "https://i.pravatar.cc/150?img=33", skills: "Figma, Adobe XD, Web Design" }
  ];

  return (
    <div>
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our mentors guide students through resume building, training,
          certifications and placement support.
        </p>
      </section>

      {/* ⭐ MENTORS */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Mentors</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {mentors.map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center hover:shadow-2xl transition">
              <img src={m.image} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h4 className="text-xl font-bold text-indigo-700">{m.name}</h4>
              <p className="text-gray-600">{m.role}</p>
              <p className="mt-2 text-sm text-gray-500">{m.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ SEARCH & FILTERS */}
   {/* ⭐ SEARCH & FILTERS */}
<section className="max-w-7xl mx-auto px-6 mb-10">
  <h3 className="text-3xl font-bold text-gray-800 mb-8">Students</h3>

  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-white p-6 rounded-xl shadow">

    {/* Search */}
    <input
      type="text"
      placeholder="Search by name or email"
      className="border p-3 rounded-lg w-full"
      value={search}
      onChange={(e) => {
        setCurrentPage(1);
        setSearch(e.target.value);
      }}
    />

    {/* Filter Domain */}
    <select
      className="border p-3 rounded-lg w-full"
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

    {/* Filter Branch */}
    <select
      className="border p-3 rounded-lg w-full"
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

    {/* Filter Year */}
    <select
      className="border p-3 rounded-lg w-full"
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

    {/* ⭐ RESET BUTTON */}
    <button
      onClick={() => {
        setSearch("");
        setFilterBranch("");
        setFilterYear("");
        setFilterDomain("");
        setCurrentPage(1);
      }}
      className="bg-red-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-red-600"
    >
      Reset
    </button>

  </div>
</section>


      {/* ⭐ STUDENTS GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        {currentStudents.length === 0 ? (
          <p className="text-gray-500 text-lg">No students match your search.</p>
        ) : (
          <>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  {currentStudents.map((s) => (
    <div
      key={s._id}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Profile Photo */}
      <div className="flex justify-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            s.name
          )}&size=128&background=6366F1&color=fff`}
          alt={s.name}
          className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-indigo-500"
        />
      </div>

      {/* Student Info */}
      <h4 className="text-2xl font-semibold text-indigo-700 text-center">
        {s.name}
      </h4>

      <p className="text-gray-600 text-center mt-1">{s.email}</p>

      <div className="mt-4 text-sm text-gray-500 space-y-2">
        <p><strong>College:</strong> {s.college}</p>
        <p><strong>Branch:</strong> {s.branch}</p>
        <p><strong>Year:</strong> {s.year}</p>
        <p><strong>Domain:</strong> {s.internshipDomain}</p>
      </div>

      {/* Optionally Add CTA */}
      <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 shadow-md transition">
        View Profile
      </button>
    </div>
  ))}
</div>


            {/* ⭐ PAGINATION */}
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Prev
              </button>

              <span className="font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Next
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
