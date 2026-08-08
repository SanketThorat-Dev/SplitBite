import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../utils/session";
import { getActiveBatch } from "../services/inventory";

import InventoryCard from "../components/dashboard/InventoryCard";
import QuickActions from "../components/dashboard/QuickActions";
import { getTodayActivity } from "../services/activity";
import ActivityCard from "../components/dashboard/ActivityCard";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import { getMonthlySummary } from "../services/summary";
import ConsumptionHistory from "../components/dashboard/ConsumptionHistory";
import PriceHistory from "../components/dashboard/PriceHistory";

export default function Dashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayActivity, setTodayActivity] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  async function loadBatch() {
    try {
      const data = await getActiveBatch();

      console.log("Active Batch:", data);

      setBatch(data);
    } catch (err) {
      console.error("Failed to load batch:", err);
    }
  }

  async function loadTodayActivity() {
    try {
      const activity = await getTodayActivity();
      setTodayActivity(activity);
    } catch (err) {
      console.error("Failed to load activity:", err);
    }
  }

  async function refreshDashboard() {
    setLoading(true);

    await Promise.all([
      loadBatch(),
      loadTodayActivity(),
      loadMonthlySummary(),
    ]);

    setHistoryRefreshKey((prev) => prev + 1);

    setLoading(false);
  }

  async function loadMonthlySummary() {
    try {
      const summary = await getMonthlySummary();
      setMonthlySummary(summary);
    } catch (err) {
      console.error(err);
    }
  }

  function logout() {
    localStorage.removeItem("roommate");
    navigate("/");
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-md mx-auto">

        <h1 className="text-3xl font-bold">
          Hi, {user.name} 👋
        </h1>

        <p className="text-gray-500 mb-6">
          Welcome back to SplitBite
        </p>

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>

          <div className="flex gap-2">

            <button
              onClick={() => navigate("/change-pin")}
              className="bg-white px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
            >
              🔐 PIN
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              ⚙️ Admin
            </button>

          </div>

        </div>

        {loading && (
          <p className="text-gray-500">
            Loading inventory...
          </p>
        )}

        {!loading && !batch && (
          <div className="bg-white rounded-2xl shadow p-6">
            <p>No active batch found.</p>
          </div>
        )}

        {batch && (
          <>
            <InventoryCard
              batch={batch}
              monthlySummary={monthlySummary}
            />

            <QuickActions
              user={user}
              batch={batch}
              onConsumptionLogged={refreshDashboard} />

            <ActivityCard activity={todayActivity} />
            <MonthlySummary summary={monthlySummary} />
            <ConsumptionHistory refreshKey={historyRefreshKey} />

            <PriceHistory />
          </>
        )}

      </div>

    </div>
  );
}