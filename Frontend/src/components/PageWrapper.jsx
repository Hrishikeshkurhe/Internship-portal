import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

const PageWrapper = ({ children }) => {
  const { hidden } = useContext(SidebarContext);

  return (
    <div
      className={`
        ${hidden ? "ml-0" : "ml-64"} 
        transition-all duration-500 min-h-screen bg-gray-100 p-10
      `}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
