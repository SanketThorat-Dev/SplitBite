import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getRoommates } from "../services/roommates";
import LoginCard from "../components/auth/LoginCard";
import { getCurrentUser } from "../utils/session";



export default function Login() {
  const [roommates, setRoommates] = useState([]);

  // ✅ Check if user is already logged in
  const user = getCurrentUser();

if (user) {
  return <Navigate to="/dashboard" replace />;
}

  useEffect(() => {
    async function loadRoommates() {
      try {
        const data = await getRoommates();
        setRoommates(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadRoommates();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-md mx-auto">

        <h1 className="text-4xl font-bold text-center mt-10">
          🥚 SplitBite
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-10">
          Track. Eat. Split Fairly.
        </p>

        <h2 className="font-semibold mb-4">
          Who's using SplitBite today?
        </h2>

        <div className="space-y-4">
          {roommates.map((roommate) => (
            <LoginCard
              key={roommate.id}
              roommate={roommate}
            />
          ))}
        </div>

      </div>
    </div>
  );
}