// src/pages/AppliedInternships.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AppliedInternships = () => {
  const [applied, setApplied] = useState([]);
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  const fetchApplied = async () => {
    const { data } = await axiosInstance.get("/student/applied");
    setApplied(data);
  };

  const fetchInternships = async () => {
    const { data } = await axiosInstance.get("/internships");
    setInternships(data);
  };

  useEffect(() => {
    fetchApplied();
    fetchInternships();
  }, []);

  // Helper to find total fees by domain
  const getTotalFees = (domain) => {
    const internship = internships.find((i) => i.title === domain);
    return Number(internship?.fees || 0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Applied Internships
      </h2>

      {applied.length === 0 ? (
        <p className="text-gray-600">
          You haven’t applied to any internships yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applied.map((form) => {
            const totalFees = getTotalFees(form.internshipDomain);
            const paid = Number(form.userPaidFees || 0); // cumulative from backend
            const remaining = Math.max(totalFees - paid, 0); // correct remaining

            return (
              <div key={form._id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {form.internshipDomain}
                </h3>
                <p className="text-gray-700">
                  <strong>Fees:</strong> ₹{totalFees}
                </p>
                <p className="text-gray-700">
                  <strong>Paid:</strong> ₹{paid}
                </p>
                <p className="text-gray-700">
                  <strong>Remaining:</strong> ₹{remaining}
                </p>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      form.paymentStatus === "Completed"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {form.paymentStatus}
                  </span>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedInternship",
                      JSON.stringify({
                        title: form.internshipDomain,
                        fees: totalFees,
                        description: "",
                        duration: "",
                      })
                    );
                    navigate("/student-form");
                  }}
                  className="mt-4 bg-gray-300 w-full text-center py-2 rounded hover:bg-gray-400"
                >
                  View Status
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedInternships;
