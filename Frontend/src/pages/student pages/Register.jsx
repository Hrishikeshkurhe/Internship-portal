import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Name Validation
    if (!/^[A-Z][a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name =
        "Name must start with a capital letter and contain only alphabets.";
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password Validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, include uppercase, lowercase, number and special character.";
    }

    // Confirm Password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axiosInstance.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 w-[620px] h-auto shadow-lg rounded"
      >
        <h2 className="text-2xl font-bold mb-8 mt-8 text-center">Sign Up</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 border p-2 rounded"
          value={formData.name}
          onChange={(e) => {
            const value = e.target.value;
            const formattedValue =
              value.charAt(0).toUpperCase() +
              value.slice(1).replace(/\s+/g, " ");
            if (/^[A-Za-z\s]*$/.test(formattedValue)) {
              setFormData({ ...formData, name: formattedValue });
            }
          }}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mb-4">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mb-4">{errors.email}</p>
        )}

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded pr-10"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm mb-4">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border p-2 rounded pr-10"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mb-4">{errors.confirmPassword}</p>
        )}

        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
