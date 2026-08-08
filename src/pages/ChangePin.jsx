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

  if (!user) {
    return <Navigate to="/" replace />;
  }

  async function handleChangePin(e) {
    e.preventDefault();

    setMessage("");

    if (!/^\d{4}$/.test(currentPin)) {
      setMessage("❌ Current PIN must be 4 digits.");
      return;
    }

    if (!/^\d{4}$/.test(newPin)) {
      setMessage("❌ New PIN must be exactly 4 digits.");
      return;
    }

    if (newPin !== confirmPin) {
      setMessage("❌ New PINs do not match.");
      return;
    }

    if (currentPin === newPin) {
      setMessage("❌ New PIN must be different from your current PIN.");
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
        setMessage("❌ Current PIN is incorrect.");
        return;
      }

      setMessage("✅ PIN changed successfully!");

      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to change PIN.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-md mx-auto">

        {/* Navigation */}

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white px-4 py-2 rounded-xl shadow hover:bg-gray-100"
          >
            ← Dashboard
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("roommate");
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            🚪 Logout
          </button>

        </div>

        {/* Change PIN Card */}

        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold">
            🔐 Change PIN
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            Change your SplitBite login PIN.
          </p>

          <form onSubmit={handleChangePin}>

            <label className="text-sm text-gray-600">
              Current PIN
            </label>

            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={currentPin}
              onChange={(e) =>
                setCurrentPin(e.target.value.replace(/\D/g, ""))
              }
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="••••"
            />

            <label className="text-sm text-gray-600 block mt-5">
              New PIN
            </label>

            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={newPin}
              onChange={(e) =>
                setNewPin(e.target.value.replace(/\D/g, ""))
              }
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="••••"
            />

            <label className="text-sm text-gray-600 block mt-5">
              Confirm New PIN
            </label>

            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={confirmPin}
              onChange={(e) =>
                setConfirmPin(e.target.value.replace(/\D/g, ""))
              }
              className="border rounded-lg w-full p-3 mt-2"
              placeholder="••••"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 mt-6 font-bold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Changing PIN..." : "Change PIN"}
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