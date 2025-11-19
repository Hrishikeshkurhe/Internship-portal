import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // If NO user → redirect to login
  if (!user) return <Navigate to="/login" />;

  // If role doesn't match
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
