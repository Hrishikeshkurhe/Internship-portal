// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  const fetchInternships = async () => {
    try {
      const { data } = await axiosInstance.get("/internships");
      setInternships(data);
    } catch (err) {
      console.error("Failed to load internships", err);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleRegister = (internship) => {
    // Save selected internship (so StudentForm can read it)
    localStorage.setItem("selectedInternship", JSON.stringify(internship));
    // Navigate to the form page (StudentForm reads selectedInternship)
    navigate("/student-form");
  };

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Internships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div
            key={internship._id}
            className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.title}</h3>
            <p className="text-gray-600 mb-2">{internship.description}</p>
            <p className="text-gray-700 mb-1"><strong>Duration:</strong> {internship.duration}</p>
            <p className="text-gray-700 mb-4"><strong>Fees:</strong> ₹{internship.fees}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => handleRegister(internship)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </button>

              {/* Optional: keep a Details view if you want */}
              <button
                onClick={() => navigate("/internship-details", { state: internship })}
                className="bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
