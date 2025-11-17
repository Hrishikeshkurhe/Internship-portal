// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [internships, setInternships] = useState([]);
  const [myForms, setMyForms] = useState([]);
  const navigate = useNavigate();

  // Fetch all internships
  const fetchInternships = async () => {
    try {
      const { data } = await axiosInstance.get("/internships");
      setInternships(data);
    } catch (err) {
      console.error("Failed to load internships", err);
    }
  };

  // Fetch student’s applied forms
  const fetchMyForms = async () => {
    try {
      const { data } = await axiosInstance.get("/student/applied");
      setMyForms(data || []);
    } catch (err) {
      console.log("Failed to load student forms", err);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchMyForms();
  }, []);

  const handleRegister = async (internship) => {
    try {
      const { data } = await axiosInstance.get(
        "/student/my-form?domain=" + internship.title
      );

      if (data) {
        // Already registered → go to View mode
        localStorage.setItem("selectedInternship", JSON.stringify(internship));
        navigate("/student-form");
        return;
      }
    } catch (err) {
      // Not registered -> continue to new form
    }

    // First time registration
    localStorage.setItem("selectedInternship", JSON.stringify(internship));
    navigate("/student-form");
  };

  // Helper: Find application by internship title
  const getFormFor = (title) => {
    return myForms.find((f) => f.internshipDomain === title);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Available Internships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => {
          const form = getFormFor(internship.title);
          const totalFees = Number(internship.fees || 0);
          const paid = Number(form?.userPaidFees || 0);
          const remaining =
            form?.paymentStatus === "Completed"
              ? 0
              : Math.max(totalFees - paid, 0);

          return (
            <div
              key={internship._id}
              className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {internship.title}
              </h3>
              <p className="text-gray-600 mb-2">{internship.description}</p>
              <p className="text-gray-700 mb-1">
                <strong>Duration:</strong> {internship.duration}
              </p>

              {/* Always show fees */}
              <p className="text-gray-700 mb-2">
                <strong>Fees:</strong> ₹{totalFees}
              </p>

              {/* If already applied, show payment info & badge */}
              {form ? (
                <div className="mt-2">
                  <p>
                    <strong>Paid:</strong> ₹{paid}
                  </p>
                  <p>
                    <strong>Remaining:</strong> ₹{remaining}
                  </p>

                  <span
                    className={`mt-2 inline-block px-3 py-1 rounded text-white ${
                      form.paymentStatus === "Completed"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {form.paymentStatus || "Pending"}
                  </span>
                  <br></br>
                  <br></br>
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "selectedInternship",
                        JSON.stringify(internship)
                      );
                      navigate("/student-form");
                    }}
                    className="bg-gray-300 w-full text-center py-2 rounded hover:bg-gray-400"
                  >
                    View / Pay Fees
                  </button>
                </div>
              ) : (
                // Normal Register button
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRegister(internship)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Register
                  </button>

                  <button
                    onClick={() =>
                      navigate("/internship-details", { state: internship })
                    }
                    className="bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300"
                  >
                    Details
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
