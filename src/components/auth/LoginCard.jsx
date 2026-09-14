import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPin } from "../../services/auth";

export default function LoginCard({ roommate }) {
  const [expanded, setExpanded] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e?.preventDefault();

    try {
      const user = await verifyPin(roommate.id, pin);

      if (!user) {
        alert("Incorrect Password");
        return;
      }

      localStorage.setItem("roommate", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6 text-gray-900 dark:text-gray-100">

      <div
        onClick={() => setExpanded(true)}
        className="cursor-pointer text-center"
      >
        <div className="text-5xl">
          {roommate.avatar}
        </div>

        <h2 className="text-xl font-bold mt-3">
          {roommate.name}
        </h2>

        {!expanded && (
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Tap to Continue
          </p>
        )}
      </div>

      {expanded && (
        <form
          onSubmit={handleLogin}
          className="mt-5 space-y-3"
        >
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-xl p-3 pr-12 text-center"
            />

            <button
              type="button"
              onClick={() => setShowPin((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              aria-label={showPin ? "Hide password" : "Show password"}
            >
              {showPin ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white rounded-xl py-3 hover:bg-emerald-600 transition"
          >
            Continue
          </button>
        </form>
      )}

    </div>
  );
}