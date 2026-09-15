import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getRoommates } from "../services/roommates";
import LoginCard from "../components/auth/LoginCard";
import { getCurrentUser } from "../utils/session";

export default function Login() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    async function loadRoommates() {
      try {
        const data = await getRoommates();
        setRoommates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRoommates();
  }, []);

  // Redirect logged-in users after hooks have been called
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mt-10">
          🥚 SplitBite
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-2 mb-10">
          Track. Eat. Split Fairly.
        </p>

        <h2 className="font-semibold mb-4">
          Who's using SplitBite today?
        </h2>

        <div className="space-y-4">
          {loading && (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 mb-4">
              Loading roommates...
            </p>
          )}

          {loading ? (
            <>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6"
                >
                  <div className="flex flex-col items-center animate-pulse">

                    {/* Avatar */}
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full" />

                    {/* Name */}
                    <div className="h-5 w-28 bg-slate-200 dark:bg-slate-700 rounded-full mt-4" />

                    {/* Subtitle */}
                    <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded-full mt-3" />

                  </div>
                </div>
              ))}
            </>
          ) : (
            roommates.map((roommate) => (
              <LoginCard
                key={roommate.id}
                roommate={roommate}
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
}