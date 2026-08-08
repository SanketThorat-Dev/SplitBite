import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentUser } from "../utils/session";
import { getAvailableBatches } from "../services/inventory";

import InventoryCard from "../components/dashboard/InventoryCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityCard from "../components/dashboard/ActivityCard";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import ConsumptionHistory from "../components/dashboard/ConsumptionHistory";
import PriceHistory from "../components/dashboard/PriceHistory";

import { getTodayActivity } from "../services/activity";
import { getMonthlySummary } from "../services/summary";

export default function Dashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayActivity, setTodayActivity] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  async function loadBatch() {
    try {
      const data = await getAvailableBatches();

      console.log("Inventory Batches:", data);

      setBatches(data || []);
    } catch (err) {
      console.error("Failed to load inventory:", err);
      setBatches([]);
    }
  }

  async function loadTodayActivity() {
    try {
      const activity = await getTodayActivity();

      setTodayActivity(activity || []);
    } catch (err) {
      console.error("Failed to load activity:", err);
      setTodayActivity([]);
    }
  }

  async function loadMonthlySummary() {
    try {
      const summary = await getMonthlySummary();

      setMonthlySummary(summary || []);
    } catch (err) {
      console.error("Failed to load monthly summary:", err);
      setMonthlySummary([]);
    }
  }

  async function refreshDashboard() {
    setLoading(true);

    try {
      await Promise.all([
        loadBatch(),
        loadTodayActivity(),
        loadMonthlySummary(),
      ]);

      setHistoryRefreshKey((prev) => prev + 1);
    } finally {
      setLoading(false);
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

        {/* Header */}

        <h1 className="text-3xl font-bold">
          Hi, {user.name} 👋
        </h1>

        <p className="text-gray-500 mb-6">
          Welcome back to SplitBite
        </p>

        {/* Navigation */}

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={logout}
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

        {/* Loading */}

        {loading && (
          <p className="text-gray-500">
            Loading inventory...
          </p>
        )}

        {/* No inventory */}

        {!loading && batches.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <p>No inventory available.</p>
          </div>
        )}

        {/* Inventory */}

        {!loading && batches.length > 0 && (
          <>
            {/* Show every non-empty batch */}

            <div className="space-y-5">

              {batches.map((batch) => (
                <InventoryCard
                  key={batch.id}
                  batch={batch}
                  monthlySummary={monthlySummary}
                />
              ))}

            </div>

            {/* Consumption */}

            <QuickActions
              user={user}
              onConsumptionLogged={refreshDashboard}
            />

            {/* Activity */}

            <ActivityCard
              activity={todayActivity}
            />

            {/* Monthly Summary */}

            <MonthlySummary
              summary={monthlySummary}
            />

            {/* Consumption History */}

            <ConsumptionHistory
              refreshKey={historyRefreshKey}
            />

            {/* Price History */}

            <PriceHistory />

          </>
        )}

      </div>

    </div>
  );
}