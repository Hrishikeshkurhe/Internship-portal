import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SidebarContext } from "../../context/SidebarContext";
import { toast } from "react-toastify";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hidden } = useContext(SidebarContext);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/enquiries");
      setEnquiries(data);
    } catch (err) {
      console.error("Fetch enquiries error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsViewed = async (id, email) => {
    try {
      await axiosInstance.put(`/enquiries/${id}/view`, { email });
      
      // Update status in UI
      setEnquiries((prev) =>
        prev.map((enq) =>
          enq._id === id ? { ...enq, viewed: true, status: "Viewed" } : enq
        )
      );
      
      // Show success notification
      toast.success("Marked as viewed + Email sent!");
    } catch (err) {
      console.error("View update error:", err);
      toast.error("Error updating enquiry status");
    }
  };

  // Calculate statistics
  const totalEnquiries = enquiries.length;
  const viewedEnquiries = enquiries.filter(enq => enq.viewed).length;
  const pendingEnquiries = totalEnquiries - viewedEnquiries;

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EN';
  };

  const getRandomColor = (email) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500'
    ];
    const index = email?.length % colors.length || 0;
    return colors[index];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const deleteEnquiry = async (id) => {
  if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

  try {
    await axiosInstance.delete(`/enquiries/${id}`);

    // Update UI instantly
    setEnquiries(prev => prev.filter(enq => enq._id !== id));

    toast.success("Enquiry deleted successfully!");
  } catch (err) {
    console.error("Delete enquiry error:", err);
    toast.error("Failed to delete enquiry");
  }
};


  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}>
      
      {/* Header Section */}
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 ml-10 mb-2">Enquiries</h1>
          <p className="text-gray-600">Manage and respond to all inquiries and messages</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalEnquiries}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingEnquiries}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Responded</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{viewedEnquiries}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl text-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b  border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">All Enquiries</h2>
                <p className="text-gray-600 text-sm mt-1">Review and manage customer messages</p>
              </div>
              <button
                onClick={fetchEnquiries}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading enquiries...</span>
              </div>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries yet</h3>
              <p className="text-gray-500">Customer enquiries will appear here when they contact you</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Info</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
  {enquiries.map((enquiry) => (
    <tr
      key={enquiry._id}
      className="hover:bg-gray-50 transition-colors duration-150 group"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${getRandomColor(
              enquiry.email
            )} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-white font-bold text-sm">
              {getInitials(enquiry.name)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{enquiry.name}</div>
            <div className="text-sm text-gray-500">Enquiry</div>
          </div>
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="space-y-1">
          <div className="text-gray-900">{enquiry.email}</div>
          <div className="text-sm text-gray-600">{enquiry.phone}</div>
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="max-w-xs">
          <p className="text-gray-700 line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
            {enquiry.message}
          </p>
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="text-sm text-gray-600">
          {formatDate(enquiry.createdAt || enquiry.date)}
        </div>
      </td>

      <td className="py-4 px-6">
        {enquiry.viewed ? (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Responded
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pending
          </span>
        )}
      </td>

      {/* ⭐ ACTIONS COLUMN (View + Delete) */}
      <td className="py-4 px-6 flex gap-3">

        {/* ⭐ MARK AS VIEWED */}
        {!enquiry.viewed ? (
          <button
            onClick={() => markAsViewed(enquiry._id, enquiry.email)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl 
            hover:bg-blue-700 transition-colors duration-200 font-medium text-sm shadow-lg shadow-blue-600/25"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mark as Viewed
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </span>
        )}

        {/* ⭐ DELETE BUTTON */}
        <button
          onClick={() => deleteEnquiry(enquiry._id)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl 
          hover:bg-red-700 transition-colors duration-200 font-medium text-sm shadow-lg shadow-red-600/25"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Delete
        </button>

      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;