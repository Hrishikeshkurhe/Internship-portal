import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewStudentForm = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (formId, status) => {
    try {
      await axiosInstance.put(`/admin/status/${formId}`, { status });
      setForms((prev) =>
        prev.map((f) => (f._id === formId ? { ...f, status } : f))
      );
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.log("Update status error:", error.response?.data || error.message);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!forms.length) return <p className="p-10">No applications found.</p>;

  const studentName = forms[0]?.name;

  // Validation helpers (for UI only)
  const isValidName = (name) => /^[A-Z][a-zA-Z ]+$/.test(name);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

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

      <div className="grid md:grid-cols-2 space-y-10">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-8 rounded-xl shadow-md mx-9"
          >
            {/* DETAILS */}
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <p>
                <strong>Name:</strong>{" "}
                <span
                  className={
                    isValidName(form.name) ? "text-black" : "text-red-500"
                  }
                >
                  {form.name}
                  {!isValidName(form.name) && " ⚠️"}
                </span>
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <span
                  className={
                    isValidEmail(form.email) ? "text-black" : "text-red-500"
                  }
                >
                  {form.email}
                  {!isValidEmail(form.email) && " ⚠️"}
                </span>
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                <span
                  className={
                    isValidPhone(form.phone) ? "text-black" : "text-red-500"
                  }
                >
                  {form.phone}
                  {!isValidPhone(form.phone) && " ⚠️"}
                </span>
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

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                onClick={() => navigate(`/edit-form/${form._id}`)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Edit
              </button>

              <button
                onClick={() => updateStatus(form._id, "Approved")}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(form._id, "Rejected")}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>

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
