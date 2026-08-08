import { useEffect, useState } from "react";
import { getConsumptionHistory } from "../../services/activity";

export default function ConsumptionHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const data = await getConsumptionHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load consumption history:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  loadHistory();
}, [refreshKey]);

  const roommates = [
    ...new Map(
      history.map((item) => [
        item.roommate_id,
        item.roommate_name,
      ])
    ).entries(),
  ];

  const filteredHistory =
    filter === "all"
      ? history
      : history.filter(
          (item) => item.roommate_id === filter
        );

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-5">

      <h2 className="text-xl font-bold mb-4">
        📜 Consumption History
      </h2>

      {/* Filter */}

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg w-full p-3 mb-5"
      >
        <option value="all">
          Everyone
        </option>

        {roommates.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {loading && (
        <p className="text-gray-500">
          Loading history...
        </p>
      )}

      {!loading && filteredHistory.length === 0 && (
        <p className="text-gray-500">
          No consumption records yet.
        </p>
      )}

      {!loading && filteredHistory.length > 0 && (
        <div className="space-y-3">

          {filteredHistory.map((item) => (

            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3 last:border-b-0"
            >

              <div>
                <p className="font-medium">
                  {item.roommate_name}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.consumed_on + "T00:00:00"
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <span className="font-bold text-green-600">
                🥚 {item.quantity}
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}