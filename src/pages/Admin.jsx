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

  function unlockAdmin(e) {
    e?.preventDefault();

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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 text-gray-900 dark:text-gray-100">

      {/* Navigation */}

      <div className="max-w-md mx-auto flex justify-between items-center mb-6">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-xl shadow dark:shadow-black/20 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
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

        <form
          onSubmit={unlockAdmin}
          className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow dark:shadow-black/20 p-8"
        >

          <h1 className="text-3xl font-bold">
            ⚙️ Admin
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter Admin PIN
          </p>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            enterKeyHint="done"
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg w-full p-3 mt-5"
            placeholder="Admin PIN"
          />

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black rounded-xl py-3 mt-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            Unlock
          </button>

          {message && (
            <p className="text-red-500 mt-4">
              {message}
            </p>
          )}

        </form>

      ) : (

        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow dark:shadow-black/20 p-8">

          <h1 className="text-3xl font-bold">
            🥚 Create New Egg Batch
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Start a fresh batch for the flat.
          </p>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg w-full p-3 mt-6"
            placeholder="Total Eggs"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg w-full p-3 mt-4"
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