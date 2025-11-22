import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { hidden, setHidden } = useContext(SidebarContext);
  const location = useLocation();

  const menuItem = (to, label, icon) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
        ${location.pathname === to ? "bg-blue-600 text-white shadow-sm" : "hover:bg-gray-100"}`}
    >
      <span className="text-lg">{icon}</span> {label}
    </Link>
  );

  return (
    <>
      {/* Show menu button when sidebar is hidden */}
      {hidden && (
        <button
          onClick={() => setHidden(false)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border hover:bg-gray-50 transition"
        >
          <svg width="22" height="22" fill="none">
            <circle cx="5" cy="12" r="1.8" fill="#111" />
            <circle cx="12" cy="12" r="1.8" fill="#111" />
            <circle cx="19" cy="12" r="1.8" fill="#111" />
          </svg>
        </button>
      )}

      {/* Sidebar Body */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl border-r p-6 flex flex-col justify-between transition-all duration-500 
        ${hidden ? "-translate-x-full" : "translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold tracking-wide">Click Innovate</h1>

          <button
            onClick={() => setHidden(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg width="20" height="20" fill="none">
              <circle cx="5" cy="12" r="1.8" fill="#111" />
              <circle cx="12" cy="12" r="1.8" fill="#111" />
              <circle cx="19" cy="12" r="1.8" fill="#111" />
            </svg>
          </button>
        </div>

        {/* MENUS */}
        <nav className="space-y-3 flex-1">
          {user?.role === "student" && (
            <>
              {menuItem("/home", "Home", "🏠")}
              {menuItem("/applied", "Applied Internships", "📄")}
            </>
          )}

          {user?.role === "subadmin" && (
            <>
              {menuItem("/mentors", "Mentor Dashboard", "👨‍🏫")}
            </>
          )}

          {user?.role === "admin" && (
            <>
              {menuItem("/admin", "Dashboard", "📊")}
              {menuItem("/admin/manage", "Manage Internships", "🛠️")}
              {menuItem("/admin/enroll-counts", "Enroll Counts", "📈")}
              {menuItem("/admin/fees", "Fees Report", "💰")}
              {menuItem("/admin/mentor", "Manage Mentors", "💰")}
              {menuItem("/admin/enquiries", "Enquiries", "📩")}

            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="space-y-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-2 text-center bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="block py-2 text-center bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
