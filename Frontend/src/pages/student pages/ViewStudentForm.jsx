import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const ViewStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/forms`);
        const selected = data.find((item) => item._id === id);
        setForm(selected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchForm();
  }, [id]);

  if (!form) return <p className="p-10">Loading...</p>;

  // =====================
  // APPROVE / REJECT
  // =====================
  const updateStatus = async (status) => {
    try {
      await axiosInstance.put(`/admin/status/${form._id}`, { status });
      alert(`Status updated to ${status}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 ml-300 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6">View Student Form</h2>

      <div className="bg-white p-8 rounded-xl shadow-md  max-w-3xl mx-auto h-100">

        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <p><strong>College:</strong> {form.college}</p>
        <p><strong>Branch:</strong> {form.branch}</p>
        <p><strong>Year:</strong> {form.year}</p>
        <p><strong>Internship Domain:</strong> {form.internshipDomain}</p>
        <p><strong>Status:</strong> {form.status}</p>

        {/* ============================
            ACTION BUTTONS
        ============================ */}
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
            onClick={() => updateStatus("Approved")}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Approve
          </button>

          {/* REJECT */}
          <button
            onClick={() => updateStatus("Rejected")}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reject
          </button>

          {/* DOWNLOAD RESUME */}
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
    </div>
  );
};

export default ViewStudentForm;
