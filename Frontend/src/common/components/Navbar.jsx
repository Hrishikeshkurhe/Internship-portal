// common/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    { name: "Know our Team", path: "/team" },
    { name: "About", path: "/about" },
    { name: "Reach to us", path: "/enquiry" },
  ];

  const isActive = (path) => location.pathname === path;

  // ⭐ Dashboard Redirect Logic
  const goToDashboard = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "subadmin"){
        navigate("/mentors");
    }else{
      navigate("/home");
    }
  };

  return (
    <nav className=" bg-gradient-to-r from-purple-400 to-indigo-600 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img alt="Clickinnovate logo" className="w-10 h-10 object-contain"src="/logo.png"></img>
              <span className="text-white font-bold text-2xl">INTERNSHIP HUB</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-white bg-white/20 shadow-md"
                    : "text-purple-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">

                {/* ⭐ Profile → Redirects to Dashboard */}
                <button
                  onClick={goToDashboard}
                  className="hidden sm:flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {user.name || "User"}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-300 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-300 shadow-md"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-lg mt-2 p-4 border border-white/20">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-white bg-white/20 shadow-md"
                      : "text-purple-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
