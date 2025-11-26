// src/pages/AppliedInternships.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AppliedInternships = () => {
  const [applied, setApplied] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState({
    applied: true,
    internships: true
  });
  const [error, setError] = useState({
    applied: null,
    internships: null
  });
  const navigate = useNavigate();

  const fetchApplied = async () => {
    try {
      setLoading(prev => ({ ...prev, applied: true }));
      setError(prev => ({ ...prev, applied: null }));
      
      const { data } = await axiosInstance.get("/student/applied");
      setApplied(data);
    } catch (err) {
      console.error("Failed to load applications", err);
      setError(prev => ({ 
        ...prev, 
        applied: "Failed to load your applications. Please try again." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, applied: false }));
    }
  };

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
        internships: "Failed to load internship details." 
      }));
    } finally {
      setLoading(prev => ({ ...prev, internships: false }));
    }
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

  const getPaymentProgress = (paid, total) => {
    if (total === 0) return 0;
    return Math.min(Math.round((paid / total) * 100), 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return "✅";
      case "Pending":
        return "⏳";
      case "In Progress":
        return "🔄";
      default:
        return "📄";
    }
  };

  const isLoading = loading.applied || loading.internships;
  const hasErrors = error.applied || error.internships;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Applications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your internship applications and payment status in one place
          </p>
        </div>
        
        {/* Summary Stats */}
        {applied.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {applied.length}
              </div>
              <div className="text-gray-600">Total Applications</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {applied.filter(app => app.paymentStatus === "Completed").length}
              </div>
              <div className="text-gray-600">Completed Payments</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {applied.reduce((total, app) => {
                  const fees = getTotalFees(app.internshipDomain);
                  const paid = Number(app.userPaidFees || 0);
                  return total + (fees - paid);
                }, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Total Remaining (₹)</div>
            </div>
          </div>
        )}
        {/* Error Display */}
        {hasErrors && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <div className="text-red-500 text-lg mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">
                  {error.applied || error.internships}
                </h3>
                <p className="text-red-600 text-sm mt-1">
                  Some information might be incomplete.
                </p>
              </div>
            </div>
          </div>
        )}
        <br></br><br></br>
        {/* Applications Grid */}
        {applied.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Applications Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't applied to any internships yet. Explore available opportunities to get started.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Browse Internships
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {applied.map((form) => {
              const totalFees = getTotalFees(form.internshipDomain);
              const paid = Number(form.userPaidFees || 0);
              const remaining = Math.max(totalFees - paid, 0);
              const progress = getPaymentProgress(paid, totalFees);

              return (
                <div
                  key={form._id}
                  className="bg-white rounded-5xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {form.internshipDomain}
                      </h3>
                      <span className="text-white text-2xl">
                        {getStatusIcon(form.paymentStatus)}
                      </span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(form.paymentStatus)}`}>
                      {form.paymentStatus}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Payment Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Payment Progress
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Fees:</span>
                        <span className="font-semibold text-gray-900">
                          ₹{totalFees.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-semibold text-green-600">
                          ₹{paid.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-semibold text-orange-600">
                          ₹{remaining.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
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
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View Application Details
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default AppliedInternships;