import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // ✅ Login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);

    // Redirect after login
    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  // ✅ Logout (FULL FIX)
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  navigate("/", { replace: true });
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
