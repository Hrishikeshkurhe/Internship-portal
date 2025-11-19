import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import AdminTabs from "../../admin/pages/AdminTabs";
import StudentProfiles from "../../students/components/StudentProfiles";
import ManageInternships from "./ManageInternships";
import AdminAnalytics from "../../admin/components/AdminAnalytics";

const AdminDashboard = () => {
  const { hidden } = useContext(SidebarContext);

  return (
    <div
      className={`min-h-screen bg-gray-100 transition-all duration-500 
      ${hidden ? "" : ""} p-8`}
    >
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
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
    </div>
  );
};

export default AdminDashboard;
