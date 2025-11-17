import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
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

  // GROUP BY EMAIL
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
    const emailLower = email.toLowerCase();

    const nameMatch = name.includes(safeSearch);
    const emailMatch = emailLower.includes(safeSearch);

    // Domain filtering
    const domainMatch = domain
      ? list.some(
          (f) =>
            f?.internshipDomain?.toLowerCase() === domain.toLowerCase()
        )
      : true;

    return (nameMatch || emailMatch) && domainMatch;
  });

  return (
    <div className="space-y-6">
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
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 capitalize">
                  {student?.name || "Unknown"}
                </h3>
                <p className="text-gray-500">{email}</p>
              </div>

              <p className="text-gray-600 text-sm">
                Total Applications:{" "}
                <span className="font-semibold text-indigo-700">
                  {studentForms.length}
                </span>
              </p>
            </div>

            {/* View profile */}
            <button
              onClick={() =>
                navigate(`/view-form/${student?._id}`)
              }
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
