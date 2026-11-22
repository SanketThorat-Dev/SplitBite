
import { useMemo, useState } from "react";

export default function MonthlySummary({
  summary,
  batchSummary,
}) {
  const [selectedBatch, setSelectedBatch] = useState("all");

  function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const batches = useMemo(() => {
    const uniqueBatches = new Map();

    batchSummary.forEach((item) => {
      if (!uniqueBatches.has(item.batch_id)) {
        uniqueBatches.set(item.batch_id, {
          id: item.batch_id,
          purchaseDate: item.purchase_date,
          price: Number(item.batch_price),
          quantity: Number(item.batch_quantity),
        });
      }
    });

    return Array.from(uniqueBatches.values());
  }, [batchSummary]);

  const filteredRows = useMemo(() => {
    if (selectedBatch === "all") {
      return batchSummary;
    }

    return batchSummary.filter(
      (item) => item.batch_id === selectedBatch
    );
  }, [batchSummary, selectedBatch]);

  const filteredSummary = useMemo(() => {
    const people = new Map();

    filteredRows.forEach((item) => {
      const existing = people.get(item.roommate_id) || {
        roommate_id: item.roommate_id,
        roommate_name: item.roommate_name,
        total_eggs: 0,
        total_amount: 0,
      };

      existing.total_eggs += Number(item.total_eggs);
      existing.total_amount += Number(item.total_amount);

      people.set(item.roommate_id, existing);
    });

    return Array.from(people.values()).sort((a, b) =>
      a.roommate_name.localeCompare(b.roommate_name)
    );
  }, [filteredRows]);

  const batchTotals = useMemo(() => {
    const totals = new Map();

    batchSummary.forEach((item) => {
      const existing = totals.get(item.batch_id) || {
        batch_id: item.batch_id,
        purchase_date: item.purchase_date,
        batch_price: Number(item.batch_price),
        batch_quantity: Number(item.batch_quantity),
        total_eggs: 0,
        total_amount: 0,
      };

      existing.total_eggs += Number(item.total_eggs);
      existing.total_amount += Number(item.total_amount);

      totals.set(item.batch_id, existing);
    });

    return Array.from(totals.values()).sort(
      (a, b) =>
        a.purchase_date.localeCompare(b.purchase_date)
    );
  }, [batchSummary]);

  const totalEggs = filteredSummary.reduce(
    (total, person) => total + person.total_eggs,
    0
  );

  const totalAmount = filteredSummary.reduce(
    (total, person) => total + person.total_amount,
    0
  );

  const hasConsumption = filteredSummary.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 mt-5 text-gray-900 dark:text-gray-100">

      <h2 className="text-xl font-bold mb-2">
        📊 This Month
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Roommate consumption breakdown
      </p>

      {/* Batch Filter */}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Filter by batch
        </label>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-xl p-3"
        >
          <option value="all">
            All Batches
          </option>

          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {formatDate(batch.purchaseDate)} — ₹
              {batch.price.toFixed(2)} ({batch.quantity} eggs)
            </option>
          ))}
        </select>
      </div>

      {/* Batch-wise Breakdown */}

      {selectedBatch === "all" && batchTotals.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            📦 Batch-wise Consumption
          </h3>

          <div className="space-y-3">
            {batchTotals.map((batch) => (
              <div
                key={batch.batch_id}
                className="border border-gray-200 dark:border-slate-600 rounded-xl p-3"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {formatDate(batch.purchase_date)}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      ₹{batch.batch_price.toFixed(2)} /{" "}
                      {batch.batch_quantity} eggs
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      {batch.total_eggs} eggs
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ₹{batch.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roommate Breakdown */}

      <h3 className="font-semibold mb-3">
        👥 Roommate Breakdown
      </h3>

      {!hasConsumption && (
        <p className="text-gray-500 dark:text-gray-400">
          No consumption found for this selection.
        </p>
      )}

      <div className="space-y-4">

        {filteredSummary.map((person) => {
          const eggs = person.total_eggs;
          const amount = person.total_amount;

          const percentage =
            totalEggs > 0
              ? (eggs / totalEggs) * 100
              : 0;

          return (
            <div
              key={person.roommate_id}
              className="border-b border-gray-200 dark:border-slate-600 pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    {person.roommate_name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    🥚 {eggs} eggs
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{amount.toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </p>
                </div>

              </div>

              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

      </div>

      {/* Total */}

      {hasConsumption && (
        <div className="border-t border-gray-200 dark:border-slate-600 mt-5 pt-5">

          <div className="flex justify-between">

            <div>
              <p className="font-bold">
                Total
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                🥚 {totalEggs} eggs
              </p>
            </div>

            <p className="font-bold text-lg">
              ₹{totalAmount.toFixed(2)}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
