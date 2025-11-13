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
  const [editingId, setEditingId] = useState(null);

  const fetchInternships = async () => {
    const { data } = await axiosInstance.get("/internships");
    setInternships(data);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axiosInstance.put(`/internships/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axiosInstance.post("/internships", formData);
    }
    setFormData({ title: "", description: "", duration: "", fees: "" });
    fetchInternships();
  };

  const handleEdit = (internship) => {
    setEditingId(internship._id);
    setFormData(internship);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      await axiosInstance.delete(`/internships/${id}`);
      fetchInternships();
    }
  };

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Internships</h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg mb-8 max-w-lg">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Fees"
          value={formData.fees}
          onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Internship" : "Add Internship"}
        </button>
      </form>

      {/* Display Internships */}
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
                <td className="py-2 px-3">{internship.fees}</td>
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
