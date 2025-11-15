import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/auth/register", formData);
    alert("Registration successful! Please login.");
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-12 w-[620px] h-[520px]  shadow-lg rounded ">
        <h2 className="text-2xl font-bold mb-8 mt-8 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-8 border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-8 border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-8 border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
