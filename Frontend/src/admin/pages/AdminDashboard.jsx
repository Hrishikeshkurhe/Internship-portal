import React, { useContext, useState , useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";

import StudentProfiles from "../../students/components/StudentProfiles";
import AdminAnalytics from "../../admin/components/AdminAnalytics";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext);
  const navigate = useNavigate();
 
  const [activeTab, setActiveTab] = useState("analytics");
  const showBackButton = activeTab !== "analytics";

  const [showPopup, setShowPopup] = useState(true);
  useEffect(() => {
  const timer = setTimeout(() => {
    setShowPopup(false); // hide popup after 3 seconds
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100
        ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}
    >
      
      {/* TOP HEADER */}
      <div className="bg-white shadow-md rounded-xl p-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold ml-5 text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 ml-5 mt-2">Monitor internship applications</p>
        </div>

        <div className="flex gap-4">
          {showBackButton && (
            <button
              onClick={() => setActiveTab("analytics")}
              className="px-5 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              ← Back
            </button>
          )}

          <button
            onClick={() => setActiveTab("students")}
            className={`px-5 py-2 rounded-lg font-semibold transition 
              ${activeTab === "students"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Student Applications
          </button>

          <button
            onClick={() => navigate("/admin/manage")}
            className="px-5 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Manage Internships
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-4">
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "students" && <StudentProfiles />}
      </div>

    {/* ⭐ Floating Notification Popup */}
{/* ⭐ FULL POPUP SHOWN FOR 3 SECONDS */}
{showPopup && (
  <div
    onClick={() => navigate("/admin/enquiries")}
    className="
      fixed bottom-6 right-6 
      bg-white rounded-2xl shadow-2xl border border-gray-200 
      p-4 w-72 cursor-pointer
      transition-all duration-300
      hover:scale-105 hover:shadow-3xl
      flex items-center gap-4
      animate-slide-up
      z-50
    "
  >
    {/* Bell Icon */}
    <div className="relative w-12 h-12 flex items-center justify-center 
                    bg-gradient-to-r from-purple-600 to-indigo-600 
                    text-white rounded-full shadow-lg animate-pulse-soft">
      🔔

      {/* Notification Badge */}
      <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                       text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
        3
      </span>
    </div>

    {/* Text */}
    <div>
      <p className="font-bold text-gray-900">New Enquiries</p>
      <p className="text-sm text-gray-600 -mt-1">Tap to view all new enquiries</p>
    </div>
  </div>
)}

{/* ⭐ SMALL CIRCULAR BELL AFTER POPUP HIDES */}
{!showPopup && (
  <div
    onClick={() => navigate("/admin/enquiries")}
    className="
      fixed bottom-6 right-6 
      bg-gradient-to-r from-purple-600 to-indigo-600
      w-16 h-16 rounded-full
      flex items-center justify-center text-white
      shadow-2xl cursor-pointer
      hover:scale-110 transition-all duration-300
      animate-pulse-soft z-50
    "
  >
    <div className="relative text-2xl">
      🔔
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                       font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
        3
      </span>
    </div>
  </div>
)}


<style>
{`
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
  }

  @keyframes pulseSoft {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5); }
    70% { box-shadow: 0 0 15px 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }
  .animate-pulse-soft {
    animation: pulseSoft 3s infinite;
  }
`}
</style>



    </div>
  );
};

export default AdminDashboard;
