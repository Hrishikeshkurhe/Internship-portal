// src/pages/InternshipDetails.jsx
import { useLocation, useNavigate } from "react-router-dom";

const InternshipDetails = () => {
  const { state: internship } = useLocation();
  const navigate = useNavigate();

  if (!internship) {
    return (
      <div className="ml-64 flex items-center justify-center h-screen text-gray-600 text-lg">
        Internship details not found.
      </div>
    );
  }

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-2xl max-w-3xl mx-auto p-10 relative">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
        >
          ← Back
        </button>

        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {internship.title}
          </h2>
          <p className="text-gray-600 text-lg mb-6">{internship.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <p className="font-semibold text-gray-700 mb-1">🕒 Duration</p>
            <p className="text-gray-600">{internship.duration}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">💰 Fees</p>
            <p className="text-gray-600">₹{internship.fees}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">📚 Mode</p>
            <p className="text-gray-600">{internship.mode || "Online / Hybrid"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">👨‍🏫 Instructor</p>
            <p className="text-gray-600">{internship.instructor || "Industry Expert"}</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            What You’ll Learn
          </h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            {(internship.topics?.length
              ? internship.topics
              : [
                  "Fundamentals of the technology",
                  "Hands-on project development",
                  "Industry-standard best practices",
                  "Certificate of completion",
                ]
            ).map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              localStorage.setItem("selectedInternship", JSON.stringify(internship));
              navigate("/student-form");
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Apply for this Internship
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
