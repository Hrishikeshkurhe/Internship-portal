import { useEffect, useState , useContext} from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";

const EnrollCounts = () => {
  const [counts, setCounts] = useState([]);
 const { hidden } = useContext(SidebarContext);
  const fetchCounts = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/enroll-counts");
      setCounts(data);
    } catch (err) {
      console.error("Error loading enroll counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className={` min-h-screen bg-gray-100 p-10 ${!hidden ? "ml-64" : "ml-10"} transition-all duration-300`}>
      
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800 ">Enrollment Counts</h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Internship Domain</th>
              <th className="p-3">Total Students Enrolled</th>
            </tr>
          </thead>

          <tbody>
            {counts.map((row) => (
              <tr key={row._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{row._id}</td>
                <td className="p-3">{row.totalStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollCounts;
