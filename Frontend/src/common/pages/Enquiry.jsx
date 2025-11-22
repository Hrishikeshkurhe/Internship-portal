import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Submitted:", formData);
    alert("Your enquiry has been submitted!");
  };

  return (
    <div>
      <Navbar />

      <section className="pt-12 pb-20 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Enquiry</h2>
        <p className="text-gray-600 text-center mb-10 text-lg">
          Need help? Send us your enquiry and our team will reach out.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              className="w-full border rounded-lg px-4 py-2 h-32"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium"
          >
            Submit Enquiry
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;
