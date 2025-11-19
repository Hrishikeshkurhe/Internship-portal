import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900">ClickInnovate</Link>

        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
          <Link to="/register" className="text-slate-700 hover:text-slate-900">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;
