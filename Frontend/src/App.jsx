import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/student pages/Register";
import StudentForm from "./pages/student pages/StudentForm";
import AdminDashboard from "./pages/admin_pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import InternshipDetails from "./pages/student pages/InternshipDetails";
import ViewStudentForm from "./pages/student pages/ViewStudentForm";
import EditStudentForm from "./pages/student pages/EditStudentForm";
import AppliedInternships from "./pages/student pages/AppliedInternships";
import ManageInternships from "./pages/admin_pages/ManageInternships";
import EnrollCounts from "./pages/EnrollCounts";



function App() {
  console.log("VITE_API =", import.meta.env.VITE_API);
  return (
    <Router>
      
      <AuthProvider>
        <Sidebar />
        <Routes>


          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/student-form" element={<ProtectedRoute role="student"><StudentForm /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute role="student"><Home /></ProtectedRoute>} />
         <Route path="/internship-details" element={<InternshipDetails />} /> 
          <Route path="/view-form/:id" element={<ProtectedRoute role="admin"><ViewStudentForm /></ProtectedRoute>}/>
          <Route path="/edit-form/:id" element={ <ProtectedRoute role="admin"> <EditStudentForm /></ProtectedRoute>}/>
          <Route path="/applied" element={<ProtectedRoute role="student"><AppliedInternships /> </ProtectedRoute> }/>
          <Route path="/manage-internships" element={ <ProtectedRoute role="admin"> <ManageInternships />  </ProtectedRoute> }/>
          <Route path="/enroll-counts" element={<EnrollCounts />} />
          
        </Routes>           
      </AuthProvider>
    </Router>
  );
}

export default App;
