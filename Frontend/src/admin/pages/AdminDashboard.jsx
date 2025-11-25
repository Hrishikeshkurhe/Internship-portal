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
      className={`min-h-screen flex flex-col  pt-10 bg-gradient-to-br from-purple-50 to-indigo-100
        ${!hidden ? "ml-84" : "ml-10"} transition-all duration-300`}
    >
   
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
