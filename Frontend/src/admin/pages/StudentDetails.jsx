import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const { hidden } = useContext(SidebarContext);

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

  // GROUP BY NAME, BUT KEEP DOMAIN-WISE RECORDS SEPARATE
  const grouped = students.reduce((acc, cur) => {
    if (!acc[cur.email]) {
      acc[cur.email] = [];
    }
    acc[cur.email].push(cur); // push separate entries
    return acc;
  }, {});

  return (
    <div
      className={`min-h-screen bg-gray-50 p-8 ${
        !hidden ? "ml-84" : "ml-0"
      } transition-all duration-300`}
    >
      <h2 className="text-3xl font-bold text-gray-900 ml-20 mb-6">
        Internship Student Details
      </h2>

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
  {Object.values(grouped).map((list, idx) =>
    list.map((s, i) => (
      <tr key={`${idx}-${i}`} className="border-b hover:bg-gray-50">

        <td className="p-3 font-medium">
          {i === 0 ? s.name : ""}
        </td>

        <td className="p-3">
          {i === 0 ? s.email : ""}
        </td>

        <td className="p-3 text-blue-700 font-semibold">
          {s.internshipDomain}
        </td>

        {/* ✅ ALWAYS SHOW COLLEGE */}
        <td className="p-3">
          {s.college}
        </td>

        <td className="p-3">
          {s.startDate ? s.startDate.slice(0, 10) : "-"}
        </td>

        <td className="p-3">
          {s.endDate ? s.endDate.slice(0, 10) : "-"}
        </td>

        <td className="p-3">
          {s.duration || "-"}
        </td>

        <td className="p-3 text-green-700 font-bold">
          ₹{s.userPaidFees}
        </td>

        <td className="p-3">
          {s.status}
        </td>

      </tr>
    ))
  )}
</tbody>


        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
