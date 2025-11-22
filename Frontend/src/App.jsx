import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./admin/components/Sidebar";
import Login from "./common/pages/Login";
import Register from "./students/pages/Register";
import StudentForm from "./students/pages/StudentForm";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./common/components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./students/pages/Home";
import InternshipDetails from "./students/pages/InternshipDetails";
import ViewStudentForm from "./students/pages/ViewStudentForm";
import EditStudentForm from "./students/pages/EditStudentForm";
import AppliedInternships from "./students/pages/AppliedInternships";
import ManageInternships from "./admin/pages/ManageInternships";
import EnrollCounts from "./admin/pages/EnrollCounts";
import { SidebarProvider } from "./context/SidebarContext";
import PageWrapper from "./common/components/PageWrapper";
import FeeReport from "./admin/pages/FeeReport";
import Landing from "./common/pages/Landing";
import About from "./common/pages/About";
import Internships from "./common/pages/Internships";
import Team from "./common/pages/Team";
import Enquiry from "./common/pages/Enquiry";
import MentorDashboard from "./mentor/pages/MentorDashboard";
import ManageMentor from "./admin/pages/ManageMentor";
import ScrollToTop from "./common/components/ScrollToTop";
import EnquiryList from "./admin/pages/EnquiryList";


function Layout() {
  const { pathname } = useLocation();   // ✅ FIXED (Correct way)

  // Pages where SIDEBAR SHOULD NOT BE SHOWN
  const hideSidebarRoutes = [
    "/", 
    "/login", 
    "/register", 
    "/about", 
    "/internships", 
    "/team", 
    "/enquiry"
  ];

  // TRUE = Sidebar hidden, FALSE = Sidebar visible
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <>
      {/* SHOW SIDEBAR ONLY WHEN SHOULD NOT BE HIDDEN */}
      {!shouldHideSidebar && <Sidebar />}

      <Routes>
       
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/team" element={<Team />} />
        <Route path="/enquiry" element={<Enquiry />} />

        {/* Public Auth */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />

        {/* Student Pages */}
        <Route
          path="/student-form"
          element={
            <ProtectedRoute role="student">
              <PageWrapper>
                <StudentForm />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute role="student">
              <PageWrapper>
                <Home />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/internship-details"
          element={
            <PageWrapper>
              <InternshipDetails />
            </PageWrapper>
          }
        />

        <Route
          path="/applied"
          element={
            <ProtectedRoute role="student">
              <PageWrapper>
                <AppliedInternships />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/fees"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <FeeReport />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <ManageInternships />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enroll-counts"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <EnrollCounts />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Admin View/Edit student forms */}
        <Route
          path="/view-form/:email"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <ViewStudentForm />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-form/:id"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper>
                <EditStudentForm />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/enquiries"
  element={
    <ProtectedRoute role="admin">
      <PageWrapper>
        <EnquiryList />
      </PageWrapper>
    </ProtectedRoute>
  }
/>

        
        {/* Mentor (subadmin) route */}
<Route
  path="/mentors"
  element={
    <ProtectedRoute role="subadmin">
      <PageWrapper>
        <MentorDashboard />
      </PageWrapper>
    </ProtectedRoute>
  }
/>

{/* Admin -> Manage Mentors */}
<Route
  path="/admin/mentor"
  element={
    <ProtectedRoute role="admin">
      <PageWrapper>
        <ManageMentor />
      </PageWrapper>
    </ProtectedRoute>
  }
/>





      </Routes>

    </>
  );
}



function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
           <ScrollToTop/>
          <Layout />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
