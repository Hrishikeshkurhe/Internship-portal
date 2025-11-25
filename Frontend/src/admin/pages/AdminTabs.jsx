// Frontend/src/pages/admin_pages/AdminTabs.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudentProfiles from "../../students/components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import AdminAnalytics from "../components/AdminAnalytics";

const AdminTabs = () => {
  const [active, setActive] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Domains for Filter Dropdown
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/admin/forms");
        const uniqueDomains = [...new Set(data.map((i) => i.internshipDomain))];
        setDomains(uniqueDomains);
      } catch (error) {
        console.log("Filter loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 flex items-center justify-center gap-3 group ${
        isActive 
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r border-gray-100 last:border-r-0"
      }`}
      onClick={() => onClick(id)}
    >
      <div className={`p-2 rounded-lg transition-all duration-300 ${
        isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"
      }`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
    </svg>
  );

  const ResetIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage students, internships, and view analytics</p>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="flex">
          <TabButton
            id="students"
            label="Student Applications"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            }
            isActive={active === "students"}
            onClick={setActive}
          />
          <TabButton
            id="manage"
            label="Manage Internships"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            isActive={active === "manage"}
            onClick={setActive}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            isActive={active === "analytics"}
            onClick={setActive}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* STUDENT APPLICATIONS TAB */}
        {active === "students" && (
          <div className="p-6">
            {/* Search and Filters Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Applications</h2>
              <p className="text-gray-600 mb-6">Search and filter student applications by name or domain</p>
              
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                  {/* Search Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Students
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by student name..."
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Domain Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Domain
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FilterIcon />
                      </div>
                      <select
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white transition-all duration-200"
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">All Domains</option>
                        {domains.map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedDomain("");
                      }}
                      className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                    >
                      <ResetIcon />
                      Reset Filters
                    </button>
                  </div>
                </div>

                {/* Active Filters Badge */}
                {(searchQuery || selectedDomain) && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Search: "{searchQuery}"
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedDomain && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Domain: {selectedDomain}
                        <button 
                          onClick={() => setSelectedDomain("")}
                          className="hover:bg-green-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Student Profiles List */}
            <StudentProfiles
              search={searchQuery}
              domain={selectedDomain}
            />
          </div>
        )}

        {/* OTHER TABS */}
        {active === "manage" && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Internships</h2>
              <p className="text-gray-600">Create, edit, and manage internship opportunities</p>
            </div>
            <ManageInternships />
          </div>
        )}
        
        {active === "analytics" && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">View insights and statistics about your internship program</p>
            </div>
            <AdminAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTabs;