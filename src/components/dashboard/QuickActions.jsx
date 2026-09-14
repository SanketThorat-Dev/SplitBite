import { useState } from "react";
import { logConsumption } from "../../services/consumption";

export default function QuickActions({
  user,
  onConsumptionLogged,
  hasInventory,
}) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Quantity waiting for confirmation
  const [pendingQuantity, setPendingQuantity] = useState(null);

  function requestConsumption(qty) {
    if (loading) return;

    if (!hasInventory) {
      alert(
        "No eggs are currently available. Please add a new inventory batch."
      );
      return;
    }

    if (!qty || qty <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // Don't log yet — ask for confirmation
    setPendingQuantity(qty);
  }

  async function confirmConsumption() {
    if (!pendingQuantity || loading) return;

    try {
      setLoading(true);

      await logConsumption(
        user.id,
        pendingQuantity
      );

      setQuantity(1);
      setPendingQuantity(null);

      await onConsumptionLogged();

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function cancelConsumption() {
    if (loading) return;

    setPendingQuantity(null);
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 mt-5 text-gray-900 dark:text-gray-100">

      <h2 className="text-xl font-bold">
        🍳 Log Consumption
      </h2>

      {!hasInventory && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          No eggs are currently available. Add a new inventory batch to
          start logging consumption.
        </p>
      )}

      {/* Quick Buttons */}

      <div className="grid grid-cols-3 gap-3 mt-5">

        <button
          disabled={loading || !hasInventory}
          onClick={() => requestConsumption(1)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold hover:bg-green-600 disabled:opacity-50"
        >
          +1
        </button>

        <button
          disabled={loading || !hasInventory}
          onClick={() => requestConsumption(2)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold hover:bg-green-600 disabled:opacity-50"
        >
          +2
        </button>

        <button
          disabled={loading || !hasInventory}
          onClick={() => requestConsumption(3)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold hover:bg-green-600 disabled:opacity-50"
        >
          +3
        </button>

      </div>

      {/* Custom Quantity */}

      <div className="mt-6">

        <label className="text-sm text-gray-500 dark:text-gray-400">
          Custom Quantity
        </label>

        <div className="flex items-center gap-3 mt-2">

          <button
            disabled={loading || !hasInventory}
            className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg disabled:opacity-50"
            onClick={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            −
          </button>

          <input
            type="number"
            min="1"
            disabled={!hasInventory}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-lg text-center py-2"
          />

          <button
            disabled={loading || !hasInventory}
            className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg disabled:opacity-50"
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          disabled={loading || !hasInventory}
          onClick={() => requestConsumption(quantity)}
          className="w-full bg-blue-600 text-white mt-4 rounded-xl py-3 font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging..." : "Log Consumption"}
        </button>

      </div>

      {/* Confirmation */}

      {pendingQuantity !== null && (
        <div className="mt-5 bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-2xl p-5">

          <h3 className="font-bold text-lg">
            Confirm Consumption
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Are you sure you want to log{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {pendingQuantity}{" "}
              {pendingQuantity === 1 ? "egg" : "eggs"}
            </span>
            ?
          </p>

          <div className="flex gap-3 mt-5">

            <button
              disabled={loading}
              onClick={cancelConsumption}
              className="flex-1 bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-100 rounded-xl py-3 font-bold hover:bg-gray-300 dark:hover:bg-slate-500 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={confirmConsumption}
              className="flex-1 bg-green-600 text-white rounded-xl py-3 font-bold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Logging..." : "Confirm"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}