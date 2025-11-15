// Frontend/src/components/StudentProfiles.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

/**
 * StudentProfiles
 * - Self-contained component that fetches admin/forms
 * - Shows only student summary cards; click to expand full details (internship cards)
 */
const StudentProfiles = () => {
  const [forms, setForms] = useState([]);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/forms");
      setForms(data);
    } catch (err) {
      console.error("Failed to fetch forms:", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/admin/status/${id}`, { status });
      fetchForms();
    } catch (err) {
      console.error(err);
    }
  };

  // Group forms by email
  const grouped = forms.reduce((acc, f) => {
    if (!acc[f.email]) acc[f.email] = [];
    acc[f.email].push(f);
    return acc;
  }, {});

  const students = Object.entries(grouped).map(([email, arr]) => ({
    email,
    name: arr[0]?.name || "Unknown Student",
    forms: arr,
    total: arr.length,
  }));

  return (
    <div className="space-y-6">
      {students.length === 0 && (
        <div className="bg-white p-6 rounded shadow">No student applications yet.</div>
      )}

      {students.map((s) => (
        <div key={s.email} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{s.name}</h3>
              <p className="text-sm text-gray-500">{s.email}</p>
            </div>

            <div className="text-sm text-gray-500">
              Total Applications:{" "}
              <span className="font-semibold text-gray-700">{s.total}</span>
            </div>
          </div>

          {/* Summarized view (click to expand) */}
          <div className="mt-4">
            <button
              onClick={() => setExpandedEmail(expandedEmail === s.email ? null : s.email)}
              className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {expandedEmail === s.email ? "Hide Details" : "View Profile"}
            </button>
          </div>

          {/* Expanded details */}
          {expandedEmail === s.email && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {s.forms.map((f) => (
                  <div
                    key={f._id}
                    className="border rounded-lg p-4 shadow-sm bg-gray-50"
                  >
                    <h4 className="text-lg font-semibold mb-1">{f.internshipDomain}</h4>

                    <p className="text-sm text-gray-600 mb-2">
                      Status:{" "}
                      <span
                        className={`px-2 py-0.5 rounded text-white text-xs ${
                          f.status === "Approved"
                            ? "bg-green-600"
                            : f.status === "Rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {f.status}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/view-form/${f._id}`)}
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => navigate(`/edit-form/${f._id}`)}
                        className="bg-purple-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => updateStatus(f._id, "Approved")}
                        className="bg-green-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(f._1d, "Rejected")}
                        className="bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>

                      {f.resume && (
                        <button
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/uploads/${f.resume}`,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="bg-gray-800 text-white text-sm px-3 py-1 rounded"
                        >
                          View Resume
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentProfiles;
