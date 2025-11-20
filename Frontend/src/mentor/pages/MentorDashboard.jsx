// Frontend/src/mentor/MentorDashboard.jsx
import React from "react";
import Navbar from "../../common/components/Navbar"; // ✔ your navbar
import Footer from "../../common/components/Footer"; // ✔ your footer
import PageWrapper from "../../common/components/PageWrapper";

const MentorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ⭐ Navbar */}
      <Navbar />

      {/* ⭐ Main Content */}
      <PageWrapper showNavbar={false} showFooter={false}>
        <div className="max-w-6xl mx-auto p-6 mt-10">
          <h1 className="text-3xl font-bold mb-4 text-indigo-700">
            Mentor Dashboard
          </h1>

          <p className="text-gray-600 mb-6">
            Welcome Mentor! Manage your assigned students, review resumes,
            evaluate progress, and guide interns effectively.
          </p>

          {/* Mentor Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-700 mb-3">
                Assigned Interns
              </h2>
              <p className="text-gray-600">
                View and manage interns assigned to you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-700 mb-3">
                Mentor Schedule
              </h2>
              <p className="text-gray-600">
                Track sessions, evaluations, and meeting schedules.
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>

      {/* ⭐ Footer */}
      <Footer />
    </div>
  );
};

export default MentorDashboard;
