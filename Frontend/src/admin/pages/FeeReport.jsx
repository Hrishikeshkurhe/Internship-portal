import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";
import React from "react";

const FeeReport = () => {
  const [forms, setForms] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [internshipFilter, setInternshipFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Sidebar context
  const { hidden } = useContext(SidebarContext);

  // Payment modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
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

  // -------------------------------
  // OPEN PAYMENT MODAL
  // -------------------------------
  const openPaymentModal = (form) => {
    setSelectedForm(form);
    setEnteredAmount(form.userPaidFees || "");
    setShowModal(true);
  };

  // -------------------------------
  // UPDATE PAYMENT API CALL
  // -------------------------------
  const handleAdminPaymentUpdate = async () => {
    if (!selectedForm) return;

    const amount = Number(enteredAmount);
    if (amount <= 0) {
      alert("Enter a valid positive amount.");
      return;
    }

    try {
      await axiosInstance.put("/admin/update-payment", {
        internshipId: selectedForm._id,
        userPaidFees: amount,
      });

      alert("Payment updated successfully!");
      setShowModal(false);
      fetchData(); // refresh table
    } catch (err) {
      console.error("Payment update failed:", err);
      alert("Failed to update payment.");
    }
  };

  // -------------------------------
  // APPLY FILTERS
  // -------------------------------
  const filteredForms = forms.filter((item) => {
    const searchMatch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const internshipMatch = internshipFilter
      ? item.internshipDomain === internshipFilter
      : true;

    const statusMatch = statusFilter
      ? (item.paymentStatus || "Pending") === statusFilter
      : true;

    return searchMatch && internshipMatch && statusMatch;
  });

  // Calculate summary statistics
  const totalRevenue = filteredForms.reduce((sum, item) => {
    return sum + Number(item.userPaidFees || 0);
  }, 0);

  const pendingPayments = filteredForms.filter(
    item => (item.paymentStatus || "Pending") === "Pending"
  ).length;

  const completedPayments = filteredForms.filter(
    item => (item.paymentStatus || "Pending") === "Completed"
  ).length;

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 flex items-center justify-center ${!hidden ? "ml-44" : "ml-10"} transition-all duration-300`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br  from-gray-50 to-blue-50/30 p-8 ${!hidden ? "ml-84" : ""} transition-all duration-300`}>
      
      {/* Payment Update Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-black/50 flex w-full items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Update Payment</h2>
                  <p className="text-gray-600 text-sm">Update payment details for student</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Student:</span>
                    <p className="font-semibold text-gray-900">{selectedForm.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Internship:</span>
                    <p className="font-semibold text-gray-900">{selectedForm.internshipDomain}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Fees:</span>
                    <p className="font-semibold text-gray-900">
                      ₹{feesByDomain[selectedForm.internshipDomain] || 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedForm.paymentStatus === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {selectedForm.paymentStatus || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Paid (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter amount paid"
                  value={enteredAmount}
                  onChange={(e) => setEnteredAmount(e.target.value)}
                  min="0"
                  step="100"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminPaymentUpdate}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg shadow-blue-600/25"
              >
                Update Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold ml-20 text-gray-900 mb-2">Payment Reports</h1>
          <p className="text-gray-600 ml-20">Manage and track student payments across all internships</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Payments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{completedPayments}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingPayments}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Students
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Internship Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Internship
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
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
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchQuery("");
                setInternshipFilter("");
                setStatusFilter("");
              }}
              className="lg:w-auto w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Internship
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(
                  filteredForms.reduce((acc, item) => {
                    if (!acc[item.name]) acc[item.name] = [];
                    acc[item.name].push(item);
                    return acc;
                  }, {})
                ).map(([name, userForms]) => (
                  <React.Fragment key={name}>
                    {/* Student Group Header */}
                    <tr className="bg-blue-50/50">
                      <td colSpan={5} className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="font-semibold text-blue-600 text-sm">
                              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{name}</h3>
                            <p className="text-sm text-gray-600">{userForms[0]?.email}</p>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Student's Internship Rows */}
                    {userForms.map((item) => {
                      const total = feesByDomain[item.internshipDomain] || 0;
                      const paid = Number(item.userPaidFees || 0);
                      const remaining = item.paymentStatus === "Completed" ? 0 : Math.max(total - paid, 0);

                      return (
                        <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-4 px-6">
                            <div className="pl-10">
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-gray-900">{item.internshipDomain}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm gap-4">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-medium">₹{total}</span>
                              </div>
                              <div className="flex justify-between text-sm gap-4">
                                <span className="text-gray-600">Paid:</span>
                                <span className="font-medium text-green-600">₹{paid}</span>
                              </div>
                              <div className="flex justify-between text-sm gap-4">
                                <span className="text-gray-600">Due:</span>
                                <span className="font-medium text-red-600">₹{remaining}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              item.paymentStatus === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {item.paymentStatus || "Pending"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => openPaymentModal(item)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium text-sm shadow-lg shadow-blue-600/25"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredForms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeReport;