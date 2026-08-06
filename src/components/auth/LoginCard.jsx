import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPin } from "../../services/auth";

export default function LoginCard({ roommate }) {
  const [expanded, setExpanded] = useState(false);
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const user = await verifyPin(roommate.id, pin);

      if (!user) {
        alert("Incorrect PIN");
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
    <div className="bg-white rounded-2xl shadow-md p-6">
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
          <p className="text-slate-500 mt-2">
            Tap to Continue
          </p>
        )}
      </div>

      {expanded && (
        <div className="mt-5 space-y-3">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full border rounded-xl p-3 text-center tracking-[10px]"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-emerald-500 text-white rounded-xl py-3 hover:bg-emerald-600 transition"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}