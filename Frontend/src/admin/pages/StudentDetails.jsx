import { useEffect, useState ,useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const { data } = await axiosInstance.get("/internships/admin/all-students");
      setStudents(data);
    } catch (err) {
      console.log("Error fetching student details", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
 const { hidden } = useContext(SidebarContext);
  return (
    <div className={`min-h-screen bg-gray-50  p-8 ${!hidden ? "ml-84" : "ml-0"} transition-all duration-300`}>
      <h2 className="text-xl font-bold mb-4 ml-20">Student Internship Details</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Domain</th>
              <th className="p-3">College</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.internshipDomain}</td>
                <td className="p-3">{s.college}</td>
                <td className="p-3">{s.startDate ? s.startDate.substring(0, 10) : "-"}</td>
                <td className="p-3">{s.endDate ? s.endDate.substring(0, 10) : "-"}</td>
                <td className="p-3">{s.duration || "-"}</td>
                <td className="p-3">₹{s.userPaidFees}</td>
                <td className="p-3">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
