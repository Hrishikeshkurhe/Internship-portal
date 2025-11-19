import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const StudentForm = () => {
  const navigate = useNavigate();
  const selectedInternship = JSON.parse(localStorage.getItem("selectedInternship"));
  const totalFees = Number(selectedInternship?.fees || 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    internshipDomain: selectedInternship?.title || "",
    resume: null,
    userPaidFees: "",        // ⭐ NEW FIELD
  });

  const [existingForm, setExistingForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentStatus, setPaymentStatus] = useState("Pending"); // ⭐ NEW FIELD

  const fetchMyForm = async () => {
    try {
      if (selectedInternship) {
        const { data } = await axiosInstance.get(
          `/student/my-form?domain=${encodeURIComponent(selectedInternship.title)}`
        );
        setExistingForm(data);

        if (data.paymentStatus) setPaymentStatus(data.paymentStatus); // ⭐ NEW
      }
    } catch {
      setExistingForm(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyForm();
  }, []);

  // ⭐ NEW — PAYMENT API CALL
const handlePayment = async () => {
  try {
    if (!existingForm?._id) {
      alert("No form found. Please submit application first.");
      return;
    }

    const enteredAmount = Number(formData.userPaidFees);

    // ⛔ Prevent paying more than total fees
    if (enteredAmount > totalFees) {
      alert(`❌ Amount cannot be greater than total fees (₹${totalFees})`);
      return;
    }

    if (enteredAmount <= 0) {
      alert("❌ Please enter a valid positive amount.");
      return;
    }

    const body = {
      internshipId: existingForm._id,
      userPaidFees: enteredAmount,
    };

    const { data } = await axiosInstance.put("/student/update-payment", body);

    alert("Payment updated!");
    setPaymentStatus(data.paymentStatus);
  } catch (err) {
    console.log("PAY ERROR:", err.response?.data);
    alert("Payment update failed!");
  }
};




  // ---------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axiosInstance.post("/student/form", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully!");
      localStorage.removeItem("selectedInternship");
      navigate("/applied");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        "Failed to submit. You may already have applied or there is a server error."
      );
    }
  };

  // ---------------------------------------

  if (loading)
    return (
      <div className="ml-64 flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Apply: {selectedInternship?.title || "Internship"}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded transition"
        >
          ← Back.
        </button>
      </div>

      {existingForm ? (
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 space-y-4 max-w-2xl border border-gray-200/50">

          {/* Existing fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-600">Name</h3>
              <p>{existingForm.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Email</h3>
              <p>{existingForm.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Internship</h3>
              <p>{existingForm.internshipDomain}</p>
            </div>
          </div>

          {/* Status */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-600 mb-2">Status</h3>
            <span
              className={`px-3 py-1 rounded text-white ${
                existingForm.status === "Approved"
                  ? "bg-green-600"
                  : existingForm.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {existingForm.status}
            </span>
          </div>

          {/* ⭐ NEW — PAYMENT STATUS DISPLAY */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-600 mb-2">Payment Status</h3>
            <span className={`px-3 py-1 rounded text-white ${
              paymentStatus === "Completed" ? "bg-green-600" : "bg-yellow-500"
            }`}>
              {paymentStatus}
            </span>
          </div>

         {/* ⭐ NEW — FEES INPUT + BUTTON */}
<div className="pt-4 border-t">
  <label className="font-semibold text-gray-700">Enter Fees Paid</label>
  <input
    type="number"
    placeholder="Amount paid"
    className="border p-3 rounded-xl w-full mt-2"
    value={formData.userPaidFees}
    onChange={(e) =>
      setFormData({ ...formData, userPaidFees: e.target.value })
    }
  />

  <p className="text-sm text-gray-500 mt-1">
    (Maximum allowed: ₹{totalFees})
  </p>

  <button
    onClick={handlePayment}
    className="bg-blue-600 text-white py-2 rounded-lg w-full mt-3"
  >
    Pay / Update Payment
  </button>
</div>


          {/* Resume Preview */}
          {existingForm.resume && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-gray-600 mb-2">Resume</h3>
              <a
                href={`http://localhost:5000/uploads/${existingForm.resume}`}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                View Uploaded Resume
              </a>
            </div>
          )}
        </div>
      ) : (
        // ---------------------------------------------
        // FORM BEFORE SUBMISSION
        // ---------------------------------------------
    // ---------------------------------------------
// FORM BEFORE SUBMISSION
// ---------------------------------------------
<form
  onSubmit={handleSubmit}
  className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200/50 max-w-2xl hover:shadow-2xl transition-all duration-300"
>
  {/* Name */}
<input
  type="text"
  placeholder="Name"
  className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
  value={formData.name}
  onChange={(e) => {
    let v = e.target.value;

    // Auto-uppercase first letter
    if (v.length === 1) {
      v = v.toUpperCase();
    }

    // Allow only letters, numbers, and spaces
    if (/^[A-Za-z][A-Za-z0-9\s]*$/.test(v) || v === "") {
      setFormData({ ...formData, name: v });
    }
  }}
  required
/>



  {/* Email */}
  <input
    type="email"
    placeholder="Email"
    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
  />

  {/* Phone Number */}
 <input
  type="text"
  placeholder="Phone"
  className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
  value={formData.phone}
  onChange={(e) => {
    let v = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (v.length > 10) v = v.slice(0, 10);     // enforces max 10 digits
    setFormData({ ...formData, phone: v });
  }}
  required
/>


  {/* College Dropdown */}
  <select
    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
    value={formData.college}
    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
    required
  >
    <option value="">Select College</option>
    <option>IIT Bombay</option>
    <option>IIT Delhi</option>
    <option>COEP Pune</option>
    <option>MIT Pune</option>
    <option>VIT Vellore</option>
    <option>Other</option>
  </select>

  {/* Branch Dropdown */}
  <select
    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
    value={formData.branch}
    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
    required
  >
    <option value="">Select Branch</option>
    <option>CSE</option>
    <option>IT</option>
    <option>ECE</option>
    <option>Mechanical</option>
    <option>Civil</option>
    <option>Other</option>
  </select>

  {/* Year - Date Picker */}
  <input
    type="date"
    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
    value={formData.year}
    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
    required
  />

  {/* Internship Domain (Read Only) */}
  <input
    className="border border-gray-300 rounded-xl p-3 mb-4 w-full bg-gray-100"
    value={formData.internshipDomain}
    readOnly
  />

  {/* Resume Upload */}
  <div className="mb-6">
    <label className="block mb-2 font-semibold text-gray-700">
      Upload Resume *
    </label>
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={(e) =>
        setFormData({ ...formData, resume: e.target.files[0] })
      }
      className="w-full border border-gray-300 p-2 rounded-xl"
      required
    />
  </div>

  <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl w-full">
    Submit Application
  </button>
</form>

      )}
    </div>
  );
};

export default StudentForm;
