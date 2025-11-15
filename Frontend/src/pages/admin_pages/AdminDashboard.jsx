// Frontend/src/pages/admin_pages/AdminDashboard.jsx
import React, { useContext } from "react";
import StudentProfiles from "../../components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import { SidebarContext } from "../../context/SidebarContext";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext); // GET SIDEBAR STATE

  return (
    <div
      className={`${hidden ? "ml-0" : ""} 
      min-h-screen bg-gray-100 p-10 transition-all duration-500`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      <h3 className="text-2xl font-bold mb-5 text-gray-800">
        📁 Student Applications
      </h3>

      {/* Self-contained student profiles component */}
      <StudentProfiles />

      {/* Manage Internships Component */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-5 text-gray-800">⚙️ Manage Internships</h3>
        <ManageInternships />
      </div>
    </div>
  );
};

export default AdminDashboard;
