// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [internships, setInternships] = useState([]);
  const [myForms, setMyForms] = useState([]);
  const [loading, setLoading] = useState({
    internships: true,
    forms: true
  });
  const [error, setError] = useState({
    internships: null,
    forms: null
  });
  const navigate = useNavigate();

  const fetchInternships = async () => {
    try {
      setLoading(prev => ({ ...prev, internships: true }));
      setError(prev => ({ ...prev, internships: null }));
      
      const { data } = await axiosInstance.get("/internships");
      setInternships(data);
    } catch (err) {
      console.error("Failed to load internships", err);
      setError(prev => ({ 
        ...prev, 
        internships: "Failed to load internships. Please try again later." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, internships: false }));
    }
  };

  const fetchMyForms = async () => {
    try {
      setLoading(prev => ({ ...prev, forms: true }));
      setError(prev => ({ ...prev, forms: null }));
      
      const { data } = await axiosInstance.get("/student/applied");
      setMyForms(data || []);
    } catch (err) {
      console.log("Failed to load student forms", err);
      setError(prev => ({ 
        ...prev, 
        forms: "Failed to load your applications." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, forms: false }));
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
        localStorage.setItem("selectedInternship", JSON.stringify(internship));
        navigate("/student-form");
        return;
      }
    } catch (err) {
      console.error("Error checking existing form:", err);
    }

    localStorage.setItem("selectedInternship", JSON.stringify(internship));
    navigate("/student-form");
  };

  const isApplied = (title) => {
    return myForms.some((f) => f.internshipDomain === title);
  };

  const availableInternships = internships.filter(
    (internship) => !isApplied(internship.title)
  );

  const isLoading = loading.internships || loading.forms;
  const hasErrors = error.internships || error.forms;

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  if (hasErrors && availableInternships.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            {error.internships || error.forms}
          </p>
          <button
            onClick={() => {
              fetchInternships();
              fetchMyForms();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Internships
          </h2>
          <p className="text-gray-600">
            Discover opportunities that match your interests
          </p>
        </div>

        {hasErrors && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              {error.internships || error.forms} Some data may not be up to date.
            </p>
          </div>
        )}

        {availableInternships.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You've applied to all available internships. Check back later for new opportunities!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableInternships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {internship.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {internship.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium mr-2">Duration:</span>
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium mr-2">Fees:</span>
                      <span className="text-green-600 font-semibold">
                        ₹{internship.fees.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleRegister(internship)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Register Now
                    </button>
                    
                    <button
                      onClick={() =>
                        navigate("/internship-details", { state: internship })
                      }
                      className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;