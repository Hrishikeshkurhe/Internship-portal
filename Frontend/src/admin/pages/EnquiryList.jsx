import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    try {
      const { data } = await axiosInstance.get("/enquiries");
      setEnquiries(data);
    } catch (err) {
      console.error("Fetch enquiries error:", err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsViewed = async (id,email) => {
    try {
      await axiosInstance.put(`/enquiries/${id}/view`, { email });
      alert("Marked as viewed + Email sent!");
      // Update status in UI
      setEnquiries((prev) =>
        prev.map((enq) =>
          enq._id === id ? { ...enq, viewed: true, status: "Viewed" } : enq
        )
      );
    } catch (err) {
      console.error("View update error:", err);
      console.log("Mark viewed error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Enquiries</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{enq.name}</td>
                <td className="p-3">{enq.email}</td>
                <td className="p-3">{enq.phone}</td>
                <td className="p-3">{enq.message}</td>

                {/* STATUS */}
                <td className="p-3 text-center">
                  {enq.viewed ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                      Viewed
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full">
                      Not Viewed
                    </span>
                  )}
                </td>

                {/* ACTION BUTTON */}
                <td className="p-3 text-center">
                  {!enq.viewed ? (
                    <button
                      onClick={() => markAsViewed(enq._id , enq.email)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Mark as Viewed
                    </button>
                  ) : (
                    <span className="text-gray-400">✓ Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default EnquiryList;
