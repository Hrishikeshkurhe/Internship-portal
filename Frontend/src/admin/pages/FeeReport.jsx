import { useEffect, useState , useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";

const FeeReport = () => {
  const [forms, setForms] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [internshipFilter, setInternshipFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
   const { hidden } = useContext(SidebarContext);

  const fetchData = async () => {
    try {
      const [formsRes, internshipsRes] = await Promise.all([
        axiosInstance.get("/admin/forms"),
        axiosInstance.get("/internships"),
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

  // Internship → fees lookup map
  const feesByDomain = internships.reduce((acc, item) => {
    acc[item.title] = Number(item.fees || 0);
    return acc;
  }, {});

  // Extract unique domains for filters
  const internshipDomains = [...new Set(forms.map((f) => f.internshipDomain))];

  // Filter logic (APPLIED BEFORE GROUPING)
  const filteredForms = forms.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());

    const internshipMatch = internshipFilter
      ? item.internshipDomain === internshipFilter
      : true;

    const statusMatch = statusFilter
      ? (item.paymentStatus || "Pending") === statusFilter
      : true;

    return searchMatch && internshipMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
      <div className={` min-h-screen bg-gray-100 p-6 ml-0 ${!hidden ? "ml-64" : "ml-10"} transition-all duration-300`}>
        <div className="bg-white p-6 shadow-lg rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-extrabold mb-10 text-gray-800">Payment Report</h2>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="flex flex-wrap gap-4 mb-5 bg-gray-50 p-4 rounded-lg border">

            {/* Search */}
            <input
              type="text"
              placeholder="Search name or email..."
              className="px-4 py-2 border rounded-lg shadow-sm w-72"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Internship filter */}
            <select
              className="px-4 py-2 border rounded-lg shadow-sm"
              value={internshipFilter}
              onChange={(e) => setInternshipFilter(e.target.value)}
            >
              <option value="">All Internships</option>
              {internshipDomains.map((domain, i) => (
                <option key={i} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              className="px-4 py-2 border rounded-lg shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Reset */}
            <button
              onClick={() => {
                setSearchQuery("");
                setInternshipFilter("");
                setStatusFilter("");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reset
            </button>
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
                filteredForms.reduce((acc, item) => {
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
                        <td className="py-2 px-3"></td>
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
  );
};

export default FeeReport;
