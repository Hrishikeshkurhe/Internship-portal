import React, { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";

import StudentProfiles from "../../students/components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import AdminAnalytics from "../../admin/components/AdminAnalytics";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext);

  // ⭐ DEFAULT HOME PAGE = ANALYTICS
  const [activeTab, setActiveTab] = useState("analytics");

  // ⭐ BACK BUTTON LOGIC (Option A → Go back to analytics)
  const handleBack = () => {
    setActiveTab("analytics");
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100
         ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}
    >
      {/* ⭐ TOP BAR */}
      <div className="bg-white shadow-md rounded-xl p-10 flex justify-between items-center">
        <div className="ml-10">
          <h1 className="text-3xl font-bold  text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor student applications and internship performance</p>
        </div>

        <div className="flex gap-4">

          {/* ⭐ BACK BUTTON */}
          <button
            onClick={handleBack}
            className="px-5 py-2 rounded-lg font-semibold transition bg-indigo-600 text-white hover:bg-gray-400"
          >
            ← Back
          </button>

          {/* ⭐ STUDENT APPLICATIONS */}
          <button
            onClick={() => setActiveTab("students")}
            className={`px-5 py-2 rounded-lg font-semibold transition 
              ${activeTab === "students" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Student Applications
          </button>

          {/* ⭐ MANAGE INTERNSHIPS */}
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-5 py-2 rounded-lg font-semibold transition 
              ${activeTab === "manage" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Manage Internships
          </button>
        </div>
      </div>

      {/* ⭐ MAIN CONTENT */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-4">
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "students" && <StudentProfiles />}
        {activeTab === "manage" && <ManageInternships />}
      </div>
    </div>
  );
};

export default AdminDashboard;
