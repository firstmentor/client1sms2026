import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authApi";

const AdminRoute = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!data || data.user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;   // 👈 important
};

export default AdminRoute;