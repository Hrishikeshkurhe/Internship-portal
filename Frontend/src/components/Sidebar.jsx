import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SidebarContext } from "../context/SidebarContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { hidden, setHidden } = useContext(SidebarContext);

  return (
    <>
      {/* Button when sidebar is hidden */}
      {hidden && (
        <button
          onClick={() => setHidden(false)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="#111" />
            <circle cx="12" cy="12" r="1.5" fill="#111" />
            <circle cx="19" cy="12" r="1.5" fill="#111" />
          </svg>
        </button>
      )}

      {/* MAIN SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg border-r p-6 flex flex-col justify-between transition-all duration-500
          ${hidden ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Click Innovate</h1>

          {/* Hide button */}
          <button onClick={() => setHidden(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="1.5" fill="#111" />
              <circle cx="12" cy="12" r="1.5" fill="#111" />
              <circle cx="19" cy="12" r="1.5" fill="#111" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className=" mb-120 space-y-4">
          {user?.role === "student" && (
            <>
              <Link className="block px-4 py-2 rounded hover:bg-gray-200" to="/home">
                - Home
              </Link>
              <Link className="block px-4 py-2 rounded hover:bg-gray-200" to="/applied">
                - Applied Internships
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link className="block px-4 py-2 rounded hover:bg-gray-200" to="/admin">
                - Dashboard
              </Link>
              <Link className="block px-4 py-2 rounded hover:bg-gray-200" to="/admin/manage">
                - Manage Internships
              </Link>
              <Link className="block px-4 py-2 rounded hover:bg-gray-200" to="/admin/enroll-counts">
                - Enroll Counts
              </Link>
            </>
          )}
        </nav>

        {/* Authentication */}
        <div className="space-y-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="block py-2 text-center bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
