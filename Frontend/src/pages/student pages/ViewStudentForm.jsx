import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const ViewStudentForm = () => {
  const { email } = useParams();          // ✅ email comes from /view-form/:email
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH ALL APPLICATIONS
  // =============================
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/forms/email/${encodeURIComponent(email)}`
        );
        setForms(data || []);
      } catch (error) {
        console.log("Fetch forms error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [email]);

  // =============================
  // APPROVE / REJECT FOR ONE FORM
  // =============================
  const updateStatus = async (formId, status) => {
    try {
      await axiosInstance.put(`/admin/status/${formId}`, { status });

      // update UI locally
      setForms((prev) =>
        prev.map((f) => (f._id === formId ? { ...f, status } : f))
      );

      alert(`Status updated to ${status}`);
    } catch (error) {
      console.log("Update status error:", error.response?.data || error.message);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!forms.length) return <p className="p-10">No applications found.</p>;

  const studentName = forms[0]?.name;

  return (
    <div className="p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-2">Student Applications</h2>
      <p className="mb-6 text-gray-600">
        {studentName} • {email} • Total applications: {forms.length}
      </p>
   <br></br>
      <div className="grid md:grid-cols-2  space-y-10">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-8 rounded-xl shadow-md  mx-9"
          >
            {/* DETAILS */}
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <p>
                <strong>Name:</strong> {form.name}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p>
                <strong>Phone:</strong> {form.phone}
              </p>
              <p>
                <strong>College:</strong> {form.college}
              </p>
              <p>
                <strong>Branch:</strong> {form.branch}
              </p>
              <p>
                <strong>Year:</strong> {form.year}
              </p>
              <p>
                <strong>Internship Domain:</strong> {form.internshipDomain}
              </p>
              <p>
                <strong>Status:</strong> {form.status}
              </p>
            </div>

            {/* ACTION BUTTONS FOR THIS APPLICATION */}
            <div className="mt-8 flex gap-4 flex-wrap">
              {/* EDIT */}
              <button
                onClick={() => navigate(`/edit-form/${form._id}`)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Edit
              </button>

              {/* APPROVE */}
              <button
                onClick={() => updateStatus(form._id, "Approved")}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>

              {/* REJECT */}
              <button
                onClick={() => updateStatus(form._id, "Rejected")}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>

              {/* VIEW RESUME */}
              {form.resume && (
                <a
                  href={`${import.meta.env.VITE_API}/uploads/${form.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Resume
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudentForm;
