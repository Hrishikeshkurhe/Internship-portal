import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PageWrapper from "../../components/PageWrapper"; 

const FeeReport = () => {
  const [forms, setForms] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all forms + all internships (to get correct fees)
  const fetchData = async () => {
    try {
      const [formsRes, internshipsRes] = await Promise.all([
        axiosInstance.get("/admin/forms"),       // all student applications
        axiosInstance.get("/internships"),       // master internships with fees
      ]);

      setForms(formsRes.data || []);
      setInternships(internshipsRes.data || []);
    } catch (err) {
      console.log("❌ Fee report fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Build a map: { "C++": 2000, "NodeJS": 5999, ... }
  const feesByDomain = internships.reduce((acc, item) => {
    acc[item.title] = Number(item.fees || 0);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <PageWrapper>
    <div className="min-h-screen bg-gray-100 p-6 ml-0">
      <div className="bg-white p-6 shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Payment Report</h2>
          {/* three dots button just for UI – you can hook sidebar toggle here */}
      
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Internship</th>
              <th className="py-2 px-3">Total Fees</th>
              <th className="py-2 px-3">Paid</th>
              <th className="py-2 px-3">Remaining</th>
              <th className="py-2 px-3">Payment Status</th>
            </tr>
          </thead>

         <tbody>
  {Object.entries(
    forms.reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    }, {})
  ).map(([name, userForms]) => (
    <>
      {/* Group Header */}
      <tr className="bg-gray-100 border-b">
        <td colSpan={7} className="font-bold py-3 px-3 text-lg">
          {name}
        </td>
      </tr>

      {/* Individual Applications */}
      {userForms.map((item) => {
        const total = feesByDomain[item.internshipDomain] || 0;
        const paid = Number(item.userPaidFees || 0);

        const remaining =
          item.paymentStatus === "Completed"
            ? 0
            : Math.max(total - paid, 0);

        return (
          <tr key={item._id} className="border-b">
            <td className="py-2 px-3"></td> {/* Empty col under name */}
            <td className="py-2 px-3">{item.email}</td>
            <td className="py-2 px-3">{item.internshipDomain}</td>
            <td className="py-2 px-3">₹{total}</td>
            <td className="py-2 px-3">₹{paid}</td>
            <td className="py-2 px-3">₹{remaining}</td>
            <td className="py-2 px-3">
              <span
                className={`px-3 py-1 rounded text-white ${
                  item.paymentStatus === "Completed"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {item.paymentStatus || "Pending"}
              </span>
            </td>
          </tr>
        );
      })}
    </>
  ))}
</tbody>

        </table>
      </div>
    </div>
    </PageWrapper>
  );
};

export default FeeReport;
