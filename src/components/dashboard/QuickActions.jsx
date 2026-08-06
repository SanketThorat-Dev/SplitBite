import { useState } from "react";
import { logConsumption } from "../../services/consumption";

export default function QuickActions({
  user,
  batch,
  onConsumptionLogged,
}) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  async function handleConsume(qty) {
    if (loading) return;

    if (qty <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      await logConsumption(
        user.id,
        batch.id,
        qty
      );

      setQuantity(1);

      await onConsumptionLogged();

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-5">

      <h2 className="text-xl font-bold">
        🍳 Log Consumption
      </h2>

      {/* Quick Buttons */}

      <div className="grid grid-cols-3 gap-3 mt-5">

        <button
          onClick={() => handleConsume(1)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold"
        >
          +1
        </button>

        <button
          onClick={() => handleConsume(2)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold"
        >
          +2
        </button>

        <button
          onClick={() => handleConsume(3)}
          className="bg-green-500 text-white rounded-xl py-3 font-bold"
        >
          +3
        </button>

      </div>

      {/* Custom Quantity */}

      <div className="mt-6">

        <label className="text-sm text-gray-500">
          Custom Quantity
        </label>

        <div className="flex items-center gap-3 mt-2">

          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            −
          </button>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full border rounded-lg text-center py-2"
          />

          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          disabled={loading}
          onClick={() => handleConsume(quantity)}
          className="w-full bg-blue-600 text-white mt-4 rounded-xl py-3 font-bold"
        >
          {loading ? "Logging..." : "Log Consumption"}
        </button>

      </div>

    </div>
  );
}