import { useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      login(data);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-10 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 animate-pulse"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/20 rounded-full blur-lg animate-bounce animation-delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-indigo-400/30 rounded-full blur-lg animate-ping"></div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12 relative z-10">
        
        {/* Left Side - Hero Content */}
        <div className="text-center lg:text-left lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm">Live Internship Portal</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
              Welcome to{" "}
              <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                <ReactTyped
                  strings={[
                    "Clickinnovate",
                    "InternshipPortal",
                    "Your Future",
                    "Success Starts Here"
                  ]}
                  typeSpeed={60}
                  backSpeed={40}
                  loop
                  cursorChar="|"
                />
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              Join thousands of students who have launched their careers through our industry-leading internship programs. 
              Your journey to professional excellence begins here.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-center">500+ Companies</h3>
              <p className="text-white/70 text-sm text-center">Top Industry Partners</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-center">50+ Internships</h3>
              <p className="text-white/70 text-sm text-center">Industry Relevant</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-center">98% Success</h3>
              <p className="text-white/70 text-sm text-center">Placement Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-96">
          <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-white/80 mt-2">Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-xl text-red-200 text-sm flex items-center space-x-2 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-purple-400/50 transition-all duration-300"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-white/90 font-medium text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-purple-400/50 transition-all duration-300"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-white/80 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/10 focus:ring-purple-400" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
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
              <span className="px-4 text-white/60 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-3 text-white hover:bg-white/20 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-3 text-white hover:bg-white/20 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="text-sm font-medium">Twitter</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-white/70 text-sm">
                Don't have an account?{" "}
                <a href="register" className="text-purple-300 font-semibold hover:text-purple-200 transition-colors duration-300">
                  Sign up now
                </a>
              </p>
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

export default Login;