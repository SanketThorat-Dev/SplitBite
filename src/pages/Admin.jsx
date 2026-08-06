import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createNewBatch } from "../services/admin";

export default function Admin() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const [quantity, setQuantity] = useState(60);
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;

  function unlockAdmin() {
    if (pin === ADMIN_PIN) {
      setAuthorized(true);
      setMessage("");
    } else {
      setMessage("❌ Incorrect Admin PIN");
    }
  }

  function logout() {
    localStorage.removeItem("roommate");
    navigate("/");
  }

  async function handleCreateBatch() {
    try {
      setLoading(true);

      await createNewBatch(
        Number(quantity),
        Number(price)
      );

      setMessage("✅ New batch created successfully");

      setPrice("");
      setQuantity(60);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!localStorage.getItem("roommate")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Navigation */}
      <div className="max-w-md mx-auto flex justify-between items-center mb-6">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
        >
          ← Dashboard
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>

      </div>

      {!authorized ? (

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold">
            ⚙️ Admin
          </h1>

          <p className="text-gray-500 mt-2">
            Enter Admin PIN
          </p>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border rounded-lg w-full p-3 mt-5"
            placeholder="Admin PIN"
          />

          <button
            onClick={unlockAdmin}
            className="w-full bg-black text-white rounded-xl py-3 mt-5 hover:bg-gray-800 transition"
          >
            Unlock
          </button>

          {message && (
            <p className="text-red-500 mt-4">
              {message}
            </p>
          )}

        </div>

      ) : (

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold">
            🥚 Create New Egg Batch
          </h1>

          <p className="text-gray-500 mt-2">
            Start a fresh batch for the flat.
          </p>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg w-full p-3 mt-6"
            placeholder="Total Eggs"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg w-full p-3 mt-4"
            placeholder="Total Price (₹)"
          />

          <button
            disabled={loading}
            onClick={handleCreateBatch}
            className="w-full bg-green-600 text-white rounded-xl py-3 mt-6 hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Batch"}
          </button>

          {message && (
            <p className="mt-5 font-medium text-green-600">
              {message}
            </p>
          )}

        </div>

      )}

    </div>
  );
}