import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fees: "",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Fetch internships
  const fetchInternships = async () => {
    const { data } = await axiosInstance.get("/internships");
    setInternships(data);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // Validation Function
  const validate = () => {
    let newErrors = {};

    // Title: Capitalize & validate
    if (!/^[A-Z]/.test(formData.title)) {
      newErrors.title = "Title must start with a capital letter";
    }

    if (!formData.description.trim()) newErrors.description = "Description is required";

    // Duration: Only numbers allowed
    if (!/^\d+$/.test(formData.duration)) {
      newErrors.duration = "Duration should be a number (e.g. 3)";
    }

    // Fees: Only numbers, at least ₹100
    const numericFees = Number(formData.fees.replace(/[^0-9]/g, ""));
    if (numericFees < 100) {
      newErrors.fees = "Fees must be a valid number and at least ₹100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanedData = {
      ...formData,
      duration: `${formData.duration} months`,
      fees: Number(formData.fees.replace(/[^0-9]/g, "")),
    };

    if (editingId) {
      await axiosInstance.put(`/internships/${editingId}`, cleanedData);
      setEditingId(null);
    } else {
      await axiosInstance.post("/internships", cleanedData);
    }

    setFormData({ title: "", description: "", duration: "", fees: "" });
    setErrors({});
    fetchInternships();
  };

  // Set editable data
  const handleEdit = (internship) => {
    setEditingId(internship._id);
    setFormData({
      title: internship.title,
      description: internship.description,
      duration: internship.duration.replace(/[^0-9]/g, ""), // strip "months"
      fees: `₹${internship.fees}`,
    });
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      await axiosInstance.delete(`/internships/${id}`);
      fetchInternships();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Internships</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg mb-8 max-w-lg">
        
        {/* INPUT: Title */}
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => {
            const v = e.target.value;
            const formatted = v.charAt(0).toUpperCase() + v.slice(1);
            setFormData({ ...formData, title: formatted });
          }}
          className="border p-2 w-full mb-1 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm mb-3">{errors.title}</p>}

        {/* INPUT: Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 w-full mb-1 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm mb-3">{errors.description}</p>}

        {/* INPUT: Duration */}
        <input
          type="text"
          placeholder="Duration (e.g. 3)"
          value={formData.duration}
          onChange={(e) => {
            const v = e.target.value;
            if (/^\d*$/.test(v)) {
              setFormData({ ...formData, duration: v });
            }
          }}
          className="border p-2 w-full mb-1 rounded"
        />
        {errors.duration && <p className="text-red-500 text-sm mb-3">{errors.duration}</p>}

        {/* INPUT: Fees */}
        <input
          type="text"
          placeholder="Fees"
          value={formData.fees}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            const formatted = raw ? `₹${raw}` : "";
            setFormData({ ...formData, fees: formatted });
          }}
          className="border p-2 w-full mb-1 rounded"
        />
        {errors.fees && <p className="text-red-500 text-sm mb-3">{errors.fees}</p>}

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Internship" : "Add Internship"}
        </button>
      </form>

      {/* Display Table */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Duration</th>
              <th className="py-2 px-3">Fees</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship._id} className="border-b">
                <td className="py-2 px-3">{internship.title}</td>
                <td className="py-2 px-3">{internship.duration}</td>
                <td className="py-2 px-3">₹{internship.fees}</td>
                <td className="py-2 px-3 space-x-2">
                  <button
                    onClick={() => handleEdit(internship)}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(internship._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageInternships;
