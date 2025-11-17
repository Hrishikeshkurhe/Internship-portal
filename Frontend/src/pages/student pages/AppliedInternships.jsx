import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const AppliedInternships = () => {
  const [applied, setApplied] = useState([]);

  const fetchApplied = async () => {
    const { data } = await axiosInstance.get("/student/applied");
    setApplied(data);
  };

  useEffect(() => {
    fetchApplied();
  }, []);

  return (
    <div className=" min-h-screen bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Applied Internships</h2>

      {applied.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any internships yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applied.map((item) => (
            <div key={item._id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.internshipDomain}
              </h3>
              <p className="text-gray-700">Name: {item.name}</p>
              <p className="text-gray-700">Email: {item.email}</p>
              <p className="text-gray-700">College: {item.college}</p>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    item.status === "Approved"
                      ? "bg-green-600"
                      : item.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedInternships;
