import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const StudentForm = () => {
  const navigate = useNavigate();
  const selectedInternship = JSON.parse(localStorage.getItem("selectedInternship"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    internshipDomain: selectedInternship?.title || "",
    resume: null, // ✅ Added resume
  });

  const [existingForm, setExistingForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyForm = async () => {
    try {
      if (selectedInternship) {
        const { data } = await axiosInstance.get(
          `/student/my-form?domain=${encodeURIComponent(selectedInternship.title)}`
        );
        setExistingForm(data);
      }
    } catch {
      setExistingForm(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyForm();
  }, []);

  // ✅ Updated handleSubmit to support file upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      console.log("📦 Sending data:", formData);
      await axiosInstance.post("/student/form", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully!");
      localStorage.removeItem("selectedInternship");
      navigate("/applied");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to submit. You may already have applied or there is a server error."
      );
    }
  };

  if (loading)
    return (
      <div className="ml-64 flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Apply: {selectedInternship?.title || "Internship"}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded transition"
        >
          ← Back.
        </button>
      </div>

      {existingForm ? (
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 space-y-4 max-w-2xl border border-gray-200/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-600">Name</h3>
              <p>{existingForm.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Email</h3>
              <p>{existingForm.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Internship</h3>
              <p>{existingForm.internshipDomain}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-600 mb-2">Status</h3>
            <span
              className={`px-3 py-1 rounded text-white ${
                existingForm.status === "Approved"
                  ? "bg-green-600"
                  : existingForm.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {existingForm.status}
            </span>
          </div>

          {/* ✅ Resume Preview */}
          {existingForm.resume && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-gray-600 mb-2">Resume</h3>
              <a
                href={`http://localhost:5000/uploads/${existingForm.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Uploaded Resume
              </a>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200/50 max-w-2xl hover:shadow-2xl transition-all duration-300"
        >
          {Object.keys(formData)
            .filter((key) => key !== "resume")
            .map((key) => (
              <input
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 mb-4 w-full outline-none transition-all duration-300"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                required
                readOnly={key === "internshipDomain"}
              />
            ))}

          {/* 📎 Resume Upload */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.files[0] })
              }
              className="w-full border border-gray-300 rounded-xl p-2 bg-white text-gray-700 cursor-pointer 
                         file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-600 file:text-white
                         hover:file:bg-indigo-700 transition-all duration-300"
              required
            />
          </div>

          <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl w-full font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentForm;
