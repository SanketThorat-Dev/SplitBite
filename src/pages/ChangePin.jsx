import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { getCurrentUser } from "../utils/session";
import { changePin } from "../services/auth";

export default function ChangePin() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  async function handleChangePin(e) {
    e.preventDefault();

    setMessage("");

    // Minimum 6 characters
    if (newPin.length < 6) {
      setMessage("❌ Password must be at least 6 characters.");
      return;
    }

    // No spaces
    if (/\s/.test(newPin)) {
      setMessage("❌ Password cannot contain spaces.");
      return;
    }

    if (newPin !== confirmPin) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    if (currentPin === newPin) {
      setMessage("❌ New password must be different from your current password.");
      return;
    }

    try {
      setLoading(true);

      const success = await changePin(
        user.id,
        currentPin,
        newPin
      );

      if (!success) {
        setMessage("❌ Current password is incorrect.");
        return;
      }

      setMessage("✅ Password changed successfully!");

      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to change password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 text-gray-900 dark:text-gray-100">

      <div className="max-w-md mx-auto">

        {/* Navigation */}

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-xl shadow dark:shadow-black/20 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            ← Dashboard
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("roommate");
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>

        </div>

        {/* Change Password Card */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow dark:shadow-black/20 p-8">

          <h1 className="text-3xl font-bold">
            🔐 Change Password
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Change your SplitBite login password.
          </p>

          <form onSubmit={handleChangePin}>

            {/* Current Password */}

            <label className="text-sm text-gray-600 dark:text-gray-300">
              Current Password
            </label>

            <div className="relative mt-2">
              <input
                type={showCurrentPin ? "text" : "password"}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                autoComplete="current-password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-lg w-full p-3 pr-12"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPin((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                aria-label={
                  showCurrentPin
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPin ? "🙈" : "👁️"}
              </button>
            </div>

            {/* New Password */}

            <label className="text-sm text-gray-600 dark:text-gray-300 block mt-5">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                type={showNewPin ? "text" : "password"}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                autoComplete="new-password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-lg w-full p-3 pr-12"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowNewPin((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                aria-label={
                  showNewPin
                    ? "Hide new password"
                    : "Show new password"
                }
              >
                {showNewPin ? "🙈" : "👁️"}
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Minimum 6 characters. Letters, numbers and special characters are allowed.
            </p>

            {/* Confirm Password */}

            <label className="text-sm text-gray-600 dark:text-gray-300 block mt-5">
              Confirm New Password
            </label>

            <div className="relative mt-2">
              <input
                type={showConfirmPin ? "text" : "password"}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                autoComplete="new-password"
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-lg w-full p-3 pr-12"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPin((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                aria-label={
                  showConfirmPin
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
              >
                {showConfirmPin ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 mt-6 font-bold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>

          </form>

          {message && (
            <p className="mt-5 font-medium">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}