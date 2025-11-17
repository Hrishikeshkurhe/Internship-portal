import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import AdminTabs from "./AdminTabs";
import StudentProfiles from "../../components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import AdminAnalytics from "../../components/AdminAnalytics";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext);

  return (
    <div
      className={`${hidden ? "" : ""} min-h-screen transition-all duration-500  bg-gray-100`}
    >
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800">Admin Dashboard</h1>

      <AdminTabs
        tabs={[
          {
            label: "Student Applications",
            content: <StudentProfiles />,
          },
          {
            label: "Manage Internships",
            content: <ManageInternships />,
          },
          {
            label: "Analytics",
            content: <AdminAnalytics />,
          },
        ]}
      />
    </div>
  );
};

export default AdminDashboard;
