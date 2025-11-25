// Frontend/src/mentor/pages/MentorDashboard.jsx
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { SidebarContext } from "../../context/SidebarContext";

const MentorDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext); // logged-in mentor

  useEffect(() => {
    if (user?._id) {
      fetchAssignedInterns();
    }
  }, [user]);

  // ⭐ Fetch interns based on mentor’s assigned course
  const fetchAssignedInterns = async () => {
  setLoading(true);
  try {
    const { data } = await axiosInstance.get(
      `/admin/mentors/${user._id}/interns`
    );
    setInterns(data);
  } catch (err) {
    console.error("Failed to fetch assigned interns", err);
  } finally {
    setLoading(false);
  }
};


  // Delete student (backend already supports)
  const handleDeleteStudent = async (studentId) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await axiosInstance.delete(`/student/${studentId}`);
      setInterns((prev) => prev.filter((i) => i._id !== studentId));
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete student.");
    }
  };
  const { hidden } = useContext(SidebarContext);
  return (
    <div className={`p-10 ${!hidden ? "ml-84" : "ml-0"} transition-all duration-300 ove`}>
      <h2 className="text-2xl font-semibold ml-20 mb-4">My Assigned Interns</h2>

      {loading ? (
        <div>Loading interns...</div>
      ) : interns.length === 0 ? (
        <div className="text-gray-500">No interns assigned yet.</div>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Internship</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {interns.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3">{s.internshipDomain}</td>

                <td className="p-3 text-right">
                  {/* Mentor edits student */}
                  <a
                    href={`/mentor/students/${s._id}/edit`}
                    className="px-3 py-1 bg-yellow-400 rounded mr-2"
                  >
                    Edit
                  </a>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteStudent(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MentorDashboard;
