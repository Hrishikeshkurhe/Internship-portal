import React, { useEffect, useState ,useContext} from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";

const API = "/admin";

const ManageMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [courses, setCourses] = useState([]); // ⭐ NEW
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
 const { hidden } = useContext(SidebarContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    courseAssigned: "", // ⭐ NEW
    id: null,
  });

  // Fetch mentors
  const fetchMentors = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`${API}/mentors`);
      setMentors(data);
    } catch (err) {
      console.error("Mentor fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ NEW — Fetch internships instead of courses
const fetchCourses = async () => {
  try {
    console.log("FETCHING INTERNSHIPS FROM /courses...");
    const { data } = await axiosInstance.get("/courses");
    console.log("COURSES RESPONSE:", data);
    setCourses(data);
  } catch (err) {
    console.log("FETCH COURSES ERROR:", err);
  }
};




  useEffect(() => {
    fetchMentors();
    fetchCourses(); // ⭐ NEW
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open Add Modal
  const openAdd = () => {
    setEditMode(false);
    setForm({
      name: "",
      email: "",
      password: "",
      courseAssigned: "",
      id: null,
    });
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEdit = (m) => {
    setEditMode(true);
    setForm({
      name: m.name,
      email: m.email,
      password: "",
      courseAssigned: m.courseAssigned || "",
      id: m._id,
    });
    setModalOpen(true);
  };

  // Submit Form
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password || undefined,
      courseAssigned: form.courseAssigned,
    };

    if (editMode) {
      await axiosInstance.put(`${API}/mentors/${form.id}`, payload);
    } else {
      await axiosInstance.post(`${API}/mentors`, payload);
    }

    setModalOpen(false);
    fetchMentors();
  } catch (err) {
    console.log("Submit error:", err);
    alert(err.response?.data?.message || "Error saving mentor");
  }
};


  return (
    <div className={`p-10 ${!hidden ? "ml-64" : "ml-10"} transition-all duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-800">Manage Mentors</h1>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
              <th className="p-3">Assigned Course</th> {/* ⭐ NEW */}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : mentors.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No mentors found.
                </td>
              </tr>
            ) : (
              mentors.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>

                  {/* ⭐ NEW */}
                  <td className="p-3 text-purple-700 font-semibold">
                    {m.courseAssigned || "Not Assigned"}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => openEdit(m)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
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

              <select
  name="courseAssigned"
  value={form.courseAssigned}
  onChange={handleChange}
  className="w-full p-2 border rounded"
  required
>
  <option value="">Select Internship</option>

  {courses.map((course) => (
    <option key={course._id} value={course.title}>
      {course.title}
    </option>
  ))}
</select>


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
