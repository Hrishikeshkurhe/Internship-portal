// Frontend/src/admin/pages/ManageInternships.jsx
import React, { useEffect, useState ,useContext} from "react";
import axiosInstance from "../../utils/axiosInstance"; // adjust path if needed
import { SidebarContext } from "../../context/SidebarContext";

const ManageInternships = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    fees: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/courses");
      setCourses(data);
    } catch (err) {
      console.error("fetch courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.duration || form.fees === "") {
      setError("All fields required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        duration: form.duration,
        fees: Number(form.fees)
      };
      await axiosInstance.post("/courses", payload);
      setForm({ title: "", description: "", duration: "", fees: "" });
      await fetchCourses();
    } catch (err) {
      console.error("create course", err);
      setError(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosInstance.delete(`/courses/${id}`);
      setCourses((c) => c.filter((x) => x._id !== id));
    } catch (err) {
      console.error("delete course", err);
      alert("Delete failed");
    }
  };
const { hidden } = useContext(SidebarContext);
  return (
      <div className={`max-w-7xl mx-auto p-10 ${!hidden ? "ml-64" : "ml-10"} transition-all duration-300`}>
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800">Manage Internships (Courses)</h2>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Create New Internship</h3>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                className="w-full border rounded px-3 py-2" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange}
                  className="w-full border rounded px-3 py-2" placeholder="e.g. 3 months" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fees (INR)</label>
                <input name="fees" value={form.fees} onChange={handleChange}
                  className="w-full border rounded px-3 py-2" type="number" />
              </div>

              <div className="flex items-end">
                <button disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded shadow">
                  {loading ? "Saving..." : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Existing Internships</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.length === 0 && <div>No courses yet.</div>}
            {courses.map((c) => (
              <div key={c._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{c.title}</h4>
                  <p className="text-sm text-gray-600">{c.description}</p>
                  <p className="text-sm mt-2"><strong>Duration:</strong> {c.duration}</p>
                  <p className="text-sm"><strong>Fees:</strong> ₹{c.fees}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ManageInternships;
