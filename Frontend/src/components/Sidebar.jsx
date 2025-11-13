import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed left-0 top-0 h-screen w-64  text-gray-800 flex flex-col justify-between p-6 shadow-2xl border-r border-indigo-300/50 transition-all duration-700">
      <div>
        <h1 className="text-2xl font-extrabold mb-8 text-center  bg-clip-text tracking-wide">
          Click Innovate
        </h1>
        <nav className="space-y-4">
          {user?.role === "student" && (
            <>
              <Link
                to="/home"
                className="block py-2 px-4 mb-2 rounded-lg hover:bg-indigo-600/40 transition-all duration-300"
              >
                - Home
              </Link>
              <Link
                to="/applied"
                className="block py-2 px-4 mb-2 rounded-lg hover:bg-indigo-600/40 transition-all duration-300"
              >
                - Applied Internships
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className="block py-2 px-4 mb-2 rounded-lg hover:bg-indigo-600/40 transition-all duration-300"
              >
                - Dashboard
              </Link>
              <Link
                to="/manage-internships"
                className="block py-2 px-4 mb-2 rounded-lg hover:bg-indigo-600/40 transition-all duration-300"
              >
                - Manage Internships
              </Link>
               <Link to="/enroll-counts" className="block py-2 px-4 rounded-lg hover:bg-indigo-600/40 transition-all duration-300 ">- Enroll Counts</Link>
            </>
          )}
        </nav>
      </div>
      <div className="space-y-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="block bg-blue-600 text-center text-white  py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block bg-green-600 text-white  text-center py-2 rounded hover:bg-green-700"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700 text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
