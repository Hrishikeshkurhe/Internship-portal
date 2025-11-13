import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ViewStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      const { data } = await axiosInstance.get("/admin/forms");
      setForm(data.find((item) => item._id === id));
    };
    fetchForm();
  }, [id]);

  if (!form)
    return (
      <div className="ml-64 flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-600">Loading...</h2>
      </div>
    );

  return (
    <div className="ml-64 min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">View Student Form</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <p><strong>College:</strong> {form.college}</p>
        <p><strong>Branch:</strong> {form.branch}</p>
        <p><strong>Year:</strong> {form.year}</p>
        <p><strong>Internship Domain:</strong> {form.internshipDomain}</p>
        <p><strong>Status:</strong> {form.status}</p>
      </div>
    </div>
  );
};

export default ViewStudentForm;
