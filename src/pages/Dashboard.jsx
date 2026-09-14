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
import { getTheme, applyTheme } from "../utils/theme";

export default function Dashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayActivity, setTodayActivity] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [theme, setTheme] = useState(getTheme());

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

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshDashboard();
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">

      <div className="max-w-md mx-auto">

        {/* Header */}

        <h1 className="text-3xl font-bold">
          Hi, {user.name} 👋
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Welcome back to SplitBite
        </p>

        {/* Navigation */}

        <div className="flex justify-between gap-2 items-center mb-6">

          <button
            onClick={logout}
            className="flex-1 justify-center bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition text-sm"
          >
            🚪 Logout
          </button>

          <div className="flex gap-2 w-full">

            <button
              onClick={toggleTheme}
              className="flex-1 justify-center bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-xl shadow hover:bg-gray-100 dark:hover:bg-slate-700 transition text-sm"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => navigate("/change-pin")}
              className="flex-1 justify-center bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-xl shadow hover:bg-gray-100 dark:hover:bg-slate-700 transition text-sm"
            >
              🔐 Password
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="flex-1 justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition text-sm"
            >
              ⚙️ Admin
            </button>

          </div>

        </div>

        {/* Loading */}

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading inventory...
          </p>
        )}

        {/* No inventory */}

        {!loading && batches.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow dark:shadow-black/20 p-6 text-center text-gray-900 dark:text-gray-100">

            <div className="text-4xl mb-3">
              🥚
            </div>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              No eggs available
            </h2>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              The current inventory has been fully consumed.
            </p>

            <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
              Add a new batch from the Admin page when you restock.
            </p>

          </div>
        )}

        {/* Inventory */}

        {!loading && batches.length > 0 && (
          <div className="space-y-5">

            {batches.map((batch) => (
              <InventoryCard
                key={batch.id}
                batch={batch}
                monthlySummary={monthlySummary}
              />
            ))}

          </div>
        )}

        {/* Consumption */}

        <QuickActions
          user={user}
          onConsumptionLogged={refreshDashboard}
          hasInventory={batches.length > 0}
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

      </div>

    </div>
  );
}