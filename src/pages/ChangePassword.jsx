import { useState } from "react";
import { useChangePasswordMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // password strength
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      toast.success(res.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Password change failed");
    }
  };

  const strength = getStrength(formData.newPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Change Password
        </h2>

        {/* Old Password */}
        <div className="mb-4 relative">
          <input
            type={showOld ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <span
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            👁️
          </span>
        </div>

        {/* New Password */}
        <div className="mb-2 relative">
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            👁️
          </span>
        </div>

        {/* Strength Meter */}
        {formData.newPassword && (
          <p
            className={`text-sm mb-3 ${
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            Password Strength: {strength}
          </p>
        )}

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;