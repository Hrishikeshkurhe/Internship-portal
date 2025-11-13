import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";




const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const fetchForms = async () => {
    const { data } = await axiosInstance.get("/admin/forms");
    setForms(data);
  };
 

  
  const updateStatus = async (id, status) => {
    await axiosInstance.put(`/admin/status/${id}`, { status });
    fetchForms();
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // ✅ Group applications by student email
  const groupedForms = forms.reduce((acc, form) => {
    if (!acc[form.email]) acc[form.email] = [];
    acc[form.email].push(form);
    return acc;
  }, {});

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Outer container */}
      <div className="space-y-8">
        {Object.entries(groupedForms).map(([email, studentForms]) => {
          const studentName = studentForms[0]?.name || "Unknown Student";

          return (
            <div
              key={email}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Student Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {studentName}
                  </h3>
                  <p className="text-gray-500">{email}</p>
                </div>
                <p className="text-sm text-gray-400">
                  Total Applications:{" "}
                  <span className="font-semibold text-gray-700">
                    {studentForms.length}
                  </span>
                </p>
              </div>

              {/* Internships List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentForms.map((f) => (
                  <div
                    key={f._id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {f.internshipDomain}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Status:{" "}
                      <span
                        className={`px-3 py-1 rounded text-white text-xs ${
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
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit-form/${f._id}`)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => updateStatus(f._id, "Approved")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(f._id, "Rejected")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
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
                          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 text-sm"
                        >
                          View Resume
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
