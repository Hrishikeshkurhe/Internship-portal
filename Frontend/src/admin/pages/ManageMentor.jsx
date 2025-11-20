import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // <-- use axios instance

const API = "/admin"; // axiosInstance already has baseURL

const ManageMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    id: null,
  });

  // Fetch mentors
  const fetchMentors = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(`${API}/mentors`);
      setMentors(data);

    } catch (err) {
      console.error("Fetch mentors error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open Modal to Add
  const openAdd = () => {
    setEditMode(false);
    setForm({ name: "", email: "", password: "", id: null });
    setModalOpen(true);
  };

  // Open Modal to Edit
  const openEdit = (m) => {
    setEditMode(true);
    setForm({
      name: m.name,
      email: m.email,
      password: "",
      id: m._id,
    });
    setModalOpen(true);
  };

  // Submit (Create + Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // UPDATE mentor
        await axiosInstance.put(`${API}/mentors/${form.id}`, form);
      } else {
        // CREATE mentor
        await axiosInstance.post(`${API}/mentors`, form);
      }

      setModalOpen(false);
      fetchMentors(); // refresh list

    } catch (err) {
      console.log("Submit error:", err);
      alert(err.response?.data?.message || "Error saving mentor");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Mentors</h1>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Mentor
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : mentors.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No mentors found.
                </td>
              </tr>
            ) : (
              mentors.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => openEdit(m)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Mentor" : "Add Mentor"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="password"
                name="password"
                placeholder={editMode ? "New Password (optional)" : "Password"}
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required={!editMode}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageMentor;
