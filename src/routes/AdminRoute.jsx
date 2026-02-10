import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authApi";

const ProtectedAdmin = ({ children }) => {
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) return <p>Loading...</p>;

  if (!data || data.role !== "admin") {
    return <Navigate to="/admin-login" replace />; // ✅ YAHI
  }

  return children;
};

export default ProtectedAdmin;
