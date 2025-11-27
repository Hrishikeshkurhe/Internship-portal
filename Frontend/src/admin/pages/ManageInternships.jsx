// Frontend/src/admin/pages/ManageInternships.jsx
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { SidebarContext } from "../../context/SidebarContext";

const ManageInternships = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    fees: ""
  });
  const [editingId, setEditingId] = useState(null);
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
  const handleBack = () => {
    setActiveTab("analytics");
  };
  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fees: course.fees
    });
  };

  const handleUpdate = async (e) => {
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
      await axiosInstance.put(`/courses/${editingId}`, payload);
      setForm({ title: "", description: "", duration: "", fees: "" });
      setEditingId(null);
      await fetchCourses();
    } catch (err) {
      console.error("update course", err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", duration: "", fees: "" });
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosInstance.delete(`/courses/${id}`);
      setCourses((c) => c.filter((x) => x._id !== id));
    } catch (err) {
      console.error("delete course", err);
      toast.error("Delete failed");
    }
  };

  const { hidden } = useContext(SidebarContext);

  return (
    <div className={`min-h-screen bg-gray-50  p-8 ${!hidden ? "ml-74" : "ml-0"} transition-all duration-300`}>
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          
          <h1 className="text-4xl font-extrabold mb-10 ml-20 text-gray-800">
            {editingId ? "Edit Internship" : "Manage Internships"}
          </h1>
          <p className="text-gray-600 ml-20">
            {editingId ? "Update internship details" : "Create and manage internship programs for students"}
          </p>
        </div>
      
    
        {/* Create/Edit Internship Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${editingId ? 'bg-yellow-50' : 'bg-indigo-50'}`}>
              <svg className={`w-5 h-5 ${editingId ? 'text-yellow-600' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {editingId ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                )}
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? "Edit Internship" : "Create New Internship"}
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={editingId ? handleUpdate : handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Internship Title
                </label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Enter internship title"
                />
              </div>

              <div className="">
                <label className="block text-2xl font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input 
                  name="duration" 
                  value={form.duration} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="e.g. 3 months"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                placeholder="Describe the internship program, skills required, and learning outcomes..."
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Fees (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    name="fees" 
                    value={form.fees} 
                    onChange={handleChange}
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 flex items-end gap-3">
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  disabled={loading}
                  className={`flex-1 ${editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-medium focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingId ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    editingId ? "Update Internship" : "Create Internship"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Existing Internships Section */}
        <div className="bg-white rounded-xl text-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className=" font-semibold text-gray-900">Existing Internships</h2>
                <p className="text-lg text-gray-600 mt-1">
                  {courses.length} internship{courses.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No internships yet</h3>
              <p className="text-gray-500">Create your first internship program to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white xl:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c._id} className="border border-gray-200 rounded-lg hover:bg-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight pr-4">{c.title}</h3>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEdit(c)}
                          className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded"
                          title="Edit internship"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(c._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded"
                          title="Delete internship"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-4 line-clamp-3 leading-relaxed">
                      {c.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-lg text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>Duration:</strong> {c.duration}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span><strong>Fees:</strong> ₹{c.fees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageInternships;