import React, { useContext } from "react";
import Navbar from "./Navbar";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";
import { SidebarContext } from "../../context/SidebarContext";

const PageWrapper = ({
  children,
  showNavbar = true,
  showFooter = true,
  publicNavbar = false,
}) => {
  const { hidden } = useContext(SidebarContext);

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100
        ${!hidden ? "ml-84" : "ml-0"} transition-all duration-300`}
    >
      {/* Navbar */}
      {showNavbar && (publicNavbar ? <PublicNavbar /> : <Navbar />)}

      {/* Main Content */}
      <main className="flex-grow px-6 py-6">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
