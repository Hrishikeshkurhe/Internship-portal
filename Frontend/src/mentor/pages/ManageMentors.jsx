// Frontend/src/admin/pages/ManageMentors.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // adjust path to your utils
import PageWrapper from "../../common/components/PageWrapper";

const ManageMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const fetchMentors = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/mentors"); // admin-only endpoint
      setMentors(data);
    } catch (err) {
      console.error("fetch mentors", err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/admin/mentors", form);
      setForm({ name: "", email: "", password: "" });
      fetchMentors();
    } catch (err) {
      console.error("create mentor", err);
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const name = prompt("New name:");
    if (!name) return;
    try {
      await axiosInstance.put(`/admin/mentors/${id}`, { name });
      fetchMentors();
    } catch (err) {
      console.error("edit mentor", err);
      alert("Edit failed");
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Mentors</h2>

        <form className="bg-white p-6 rounded shadow mb-6" onSubmit={handleCreate}>
          <h3 className="text-lg font-semibold mb-3">Create Mentor</h3>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
            className="w-full p-2 border rounded mb-2" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
            className="w-full p-2 border rounded mb-2" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password"
            type="password" className="w-full p-2 border rounded mb-2" />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Creating..." : "Create Mentor"}</button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-3">Existing Mentors</h3>
          <div className="space-y-3">
            {mentors.map(m => (
              <div key={m._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.email}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(m._id)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ManageMentors;
