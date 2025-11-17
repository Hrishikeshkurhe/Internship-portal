import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/student pages/Register";
import StudentForm from "./pages/student pages/StudentForm";
import AdminDashboard from "./pages/admin_pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/student pages/Home";
import InternshipDetails from "./pages/student pages/InternshipDetails";
import ViewStudentForm from "./pages/student pages/ViewStudentForm";
import EditStudentForm from "./pages/student pages/EditStudentForm";
import AppliedInternships from "./pages/student pages/AppliedInternships";
import ManageInternships from "./pages/admin_pages/ManageInternships";
import EnrollCounts from "./pages/EnrollCounts";
import { SidebarProvider } from "./context/SidebarContext";
import PageWrapper from "./components/PageWrapper";
import FeeReport from "./pages/admin_pages/FeeReport";

function Layout() {
  return (
    <>
      {/* Sidebar always visible */}
      <Sidebar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

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

        {/* Student Routes */}
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


        {/* Admin Routes */}
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
      <FeeReport />
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

        {/* View/Edit Forms */}
        <Route
          path="/view-form/:id"
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
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
