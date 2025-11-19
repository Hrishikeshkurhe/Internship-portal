import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ReactTyped } from "react-typed";

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
  const [isLoading, setIsLoading] = useState(false);

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
    
    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-15 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
     >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 animate-pulse"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-400/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1000ms'}}></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-400/30 rounded-full blur-lg animate-ping"></div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12 relative z-10">
        
        {/* Left Side - Hero Content */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm">Join Our Community</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
              Start Your{" "}
              <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                <ReactTyped
                  strings={[
                    "Journey Today",
                    "Career Path",
                    "Success Story",
                    "Future Now"
                  ]}
                  typeSpeed={60}
                  backSpeed={40}
                  loop
                  cursorChar="|"
                />
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              Join thousands of successful students who transformed their careers through our internship programs. 
              Create your account and unlock endless opportunities.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Industry Ready Skills</h3>
              <p className="text-white/70 text-sm">Learn what companies actually need</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Mentor Support</h3>
              <p className="text-white/70 text-sm">1:1 guidance from industry experts</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Guaranteed Internship</h3>
              <p className="text-white/70 text-sm">Get placed in top companies</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Career Growth</h3>
              <p className="text-white/70 text-sm">Fast-track your professional journey</p>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-96">
          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-white/80 mt-2">Join us and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-green-400/50 transition-all duration-300"
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
                  required
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-2 flex items-center space-x-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-green-400/50 transition-all duration-300"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-2 flex items-center space-x-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-green-400/50 transition-all duration-300 pr-12"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9 9m4.242 4.242L14 14m-4.242-4.242L6.343 6.343m8.485 8.485L17.657 17.657M9.878 9.878l8.485-8.485M14 14l5.657 5.657M3 3l3.43 3.43" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-300 text-sm mt-2 flex items-center space-x-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-green-400/50 transition-all duration-300 pr-12"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9 9m4.242 4.242L14 14m-4.242-4.242L6.343 6.343m8.485 8.485L17.657 17.657M9.878 9.878l8.485-8.485M14 14l5.657 5.657M3 3l3.43 3.43" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-300 text-sm mt-2 flex items-center space-x-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 text-sm">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 mt-1 rounded border-white/30 bg-white/10 focus:ring-green-400" 
                  required 
                />
                <span className="text-white/80">
                  I agree to the{" "}
                  <a href="#" className="text-green-300 hover:text-green-200 transition-colors duration-300 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-green-300 hover:text-green-200 transition-colors duration-300 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-white/60 text-sm">Already have an account?</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <a 
                href="/login" 
                className="inline-flex items-center space-x-2 text-green-300 font-semibold hover:text-green-200 transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign in to your account</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
        © 2024 Clickinnovate Internship Portal. All rights reserved.
      </div>
    </div>
  );
};

export default Register;