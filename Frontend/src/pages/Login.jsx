import { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      login(data);

      // ✅ Redirect based on user role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="ml-64 flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-red-00 to-purple-100 transition-all duration-700">
  <form
    onSubmit={handleSubmit}
    className="bg-white/80 backdrop-blur-2xl p-10 shadow-xl rounded-2xl w-[620px] flex flex-col justify-center border border-gray-200/40 transition-all duration-500 hover:shadow-2xl"
  >
    <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
      Sign In
    </h2>

    <input
      type="email"
      placeholder="Email"
      className="w-full mb-5 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 outline-none transition-all duration-300 text-gray-700"
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full mb-6 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-3 outline-none transition-all duration-300 text-gray-700"
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />

    <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg">
      Login
    </button>
  </form>
</div>

  );
};

export default Login;
