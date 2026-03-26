import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useLogoutMutation,
  authApi
} from "../features/auth/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      // 🔥 cache clear
      dispatch(authApi.util.resetApiState());

      toast.success("Logout successful");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const user = data?.user;

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 bg-opacity-95 text-white shadow-md z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Student Result Portal
        </h1>

        <nav className="hidden md:flex space-x-6 font-medium text-sm md:text-base items-center">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Student Login
              </Link>
              <Link to="/admin-login" className="hover:text-yellow-300">
                Admin Login
              </Link>
            </>
          )}

          {user && (
            <>
              

              
              <Link to="/student/result" className="hover:text-yellow-300">
                My Result
              </Link>
              <Link to="/change-password" className="hover:text-yellow-300">
                Change Password
              </Link>
              <span className="text-yellow-300 font-semibold">
                👤 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {!user && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Student Login
              </Link>
              <Link to="/admin-login" onClick={() => setIsOpen(false)}>
                Admin Login
              </Link>
            </>
          )}

          {user && (
            <>
              <p className="text-yellow-300 font-semibold">
                👤 {user.name}
              </p>

              <Link to="/change-password" onClick={() => setIsOpen(false)}>
                Change Password
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;