import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { hidden, setHidden } = useContext(SidebarContext);
  const location = useLocation();

  const MenuItem = ({ to, label, icon, badge }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative
          ${isActive 
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25" 
            : "hover:bg-gray-50 hover:translate-x-1 text-gray-700"
          }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-full"></div>
        )}
        
        {/* Icon */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
          ${isActive 
            ? "bg-white/20" 
            : "bg-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        
        {/* Label */}
        <span className={`font-medium flex-1 transition-all duration-300
          ${isActive ? "text-white" : "group-hover:text-blue-600"}`}
        >
          {label}
        </span>
        
        {/* Badge */}
        {badge && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full
            ${isActive 
              ? "bg-white/20 text-white" 
              : "bg-blue-100 text-blue-600"
            }`}
          >
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const MenuSection = ({ title, children }) => (
    <div className="mb-6">
      {title && (
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
          {title}
        </h3>
      )}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Menu Button */}
      {hidden && (
        <button
          onClick={() => setHidden(false)}
          className="fixed top-6 left-6 z-50 p-3 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
            <div className="w-5 h-0.5 bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
            <div className="w-5 h-0.5 bg-gray-600 rounded-full group-hover:bg-blue-600 transition-colors"></div>
          </div>
        </button>
      )}

      {/* Sidebar Overlay */}
      {!hidden && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setHidden(true)}
        />
      )}

      {/* Sidebar Body */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-2xl border-r border-gray-100 flex flex-col z-50 transition-all duration-500
          ${hidden ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                  Click Innovate
                </h1>
                <p className="text-xs text-gray-500">Internship Platform</p>
              </div>
            </div>

            <button
              onClick={() => setHidden(true)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                   {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  {user.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate ">{user.name || 'User'}</h3>
                <p className="text-sm text-gray-500  truncate">{user.email || 'User'}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {user?.role === "student" && (
              <MenuSection>
                <MenuItem to="/home" label="Availale Internships" icon="📊" />
                <MenuItem to="/applied" label="My Applications" icon="📄" badge="3" />
              
                
              </MenuSection>
            )}

            {user?.role === "subadmin" && (
              <MenuSection title="Mentor Panel">
                <MenuItem to="/mentors" label="Mentor Dashboard" icon="👨‍🏫" />
                
              </MenuSection>
            )}

            {user?.role === "admin" && (
              <>
                <MenuSection title="Overview">
                  <MenuItem to="/admin" label="Dashboard" icon="📊" />
              
                </MenuSection>

                <MenuSection title="Management">
                  <MenuItem to="/admin/manage" label="Internships" icon="🛠️" badge="8" />
                  <MenuItem to="/admin/mentor" label="Mentors" icon="👨‍🏫" badge="5" />
                  <MenuItem to="/admin/enroll-counts" label="Enrollments" icon="📈" />
                  <MenuItem to="/admin/fees" label="Fee Reports" icon="💰" badge="2" />
                  <MenuItem to="/admin/enquiries" label="Enquiries" icon="📩" badge="7" />
                </MenuSection>

              
              </>
            )}

            {/* Common Links */}
        
          </nav>
        </div>

        {/* Footer / Auth Section */}
        <div className="p-6 border-t border-gray-100">
          {!user ? (
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="block w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-center rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                
                <button
                  onClick={logout}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Logout
                </button>
              </div>
              
              {/* Version Info */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">v2.1.0 • Click Innovate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;