import React, { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";

import StudentProfiles from "../../students/components/StudentProfiles";
import AdminAnalytics from "../../admin/components/AdminAnalytics";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext);
  const navigate = useNavigate();

  // ⭐ DEFAULT: Home page = analytics
  const [activeTab, setActiveTab] = useState("analytics");

  // ⭐ Show BACK button only when not on analytics
  const showBackButton = activeTab !== "analytics";

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100
        ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}
    >
      {/* Top Header */}
      <div className="bg-white shadow-md rounded-xl p-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor internship applications</p>
        </div>

        <div className="flex gap-4">

          {/* ⭐ BACK BUTTON ONLY WHEN NOT ON HOME PAGE */}
          {showBackButton && (
            <button
              onClick={() => setActiveTab("analytics")}
              className="px-5 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              ← Back
            </button>
          )}

          {/* ⭐ STUDENT APPLICATIONS → stays inside dashboard */}
          <button
            onClick={() => setActiveTab("students")}
            className={`px-5 py-2 rounded-lg font-semibold transition 
              ${activeTab === "students"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Student Applications
          </button>

          {/* ⭐ MANAGE INTERNSHIPS → NEW PAGE */}
          <button
            onClick={() => navigate("/admin/manage")}
            className="px-5 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Manage Internships
          </button>
        </div>
      </div>

      {/* ⭐ CONTENT SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-4">
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "students" && <StudentProfiles />}
      </div>
    </div>
  );
};

export default AdminDashboard;
