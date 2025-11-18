// Frontend/src/pages/admin_pages/AdminTabs.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudentProfiles from "../../components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import AdminAnalytics from "../../components/AdminAnalytics";

const AdminTabs = () => {
  const [active, setActive] = useState("students");

  // 🔍 Search + Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");

  // Load Domains for Filter Dropdown
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/forms");
        const uniqueDomains = [...new Set(data.map((i) => i.internshipDomain))];
        setDomains(uniqueDomains);
      } catch (error) {
        console.log("Filter loading error:", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div>
      {/* Tabs */}
      <div className="flex bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <button
          className={`flex-1 py-3 font-semibold transition ${
            active === "students" ? "bg-indigo-600 text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => setActive("students")}
        >
          Student Applications
        </button>

        <button
          className={`flex-1 py-3 font-semibold transition ${
            active === "manage" ? "bg-indigo-600 text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => setActive("manage")}
        >
          Manage Internships
        </button>

        <button
          className={`flex-1 py-3 font-semibold transition ${
            active === "analytics" ? "bg-indigo-600 text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => setActive("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* STUDENT APPLICATIONS TAB */}
      {active === "students" && (
        <div>
          {/* 🔍 Search + Filters */}
          <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-4 items-center flex-wrap">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by student name..."
              className="px-4 py-2 border rounded-lg w-72 shadow-sm focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Domain Filter */}
            <select
              className="px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="">All Domains</option>
              {domains.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Reset */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDomain("");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Reset
            </button>
          </div>

          {/* Student Profiles List */}
          <StudentProfiles
            search={searchQuery}
            domain={selectedDomain}
          />
        </div>
      )}

      {/* OTHER TABS */}
      {active === "manage" && <ManageInternships />}
      {active === "analytics" && <AdminAnalytics />}
    </div>
  );
};

export default AdminTabs;
