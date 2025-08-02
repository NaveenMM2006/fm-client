import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) return <Navigate to="/login" />;

  // Role restricted (e.g., only seller allowed)
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;