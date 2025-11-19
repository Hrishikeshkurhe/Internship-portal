import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentProfiles = ({ search = "", domain = "" }) => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/forms");
      setForms(data || []);
    } catch (err) {
      console.log("Error fetching forms:", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Group by email
  const grouped = forms.reduce((acc, form) => {
    const key = form?.email || "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(form);
    return acc;
  }, {});

  // FILTERING
  const filtered = Object.entries(grouped).filter(([email, list]) => {
    const safeSearch = search.toLowerCase();

    const name = list[0]?.name?.toLowerCase() || "";

    const nameMatch = name.includes(safeSearch); // ONLY search by name

    // Domain filtering
    const domainMatch = domain
      ? list.some(
          (f) =>
            f?.internshipDomain?.toLowerCase() === domain.toLowerCase()
        )
      : true;

    return nameMatch && domainMatch;
  });

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
    {filtered.length === 0 && (
      <p className="text-gray-600 text-center text-lg py-6">
        No students found.
      </p>
    )}

    {filtered.map(([email, studentForms], idx) => {
      const student = studentForms[0] || {};

      return (
        <div
          key={idx}
          className="bg-indigo-100 rounded-xl shadow-md p-5 border  border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="mb-4 ">
            <h3 className="text-xl font-bold text-gray-800 capitalize">
              {student?.name || "Unknown"}
            </h3>
            <p className="text-gray-500 text-sm">{email}</p>
            <p className="text-gray-600 text-xs mt-1">
              Total Applications:{" "}
              <span className="font-semibold text-indigo-700">
                {studentForms.length}
              </span>
            </p>
          </div>

          <button
            onClick={() => navigate(`/view-form/${encodeURIComponent(student.email)}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            View Profile
          </button>
        </div>
      );
    })}
  </div>
);

};

export default StudentProfiles;
