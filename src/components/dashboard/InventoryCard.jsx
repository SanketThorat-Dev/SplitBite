export default function InventoryCard({ batch, monthlySummary = [] }) {
  const remaining = Number(batch.remaining_quantity);
  const quantity = Number(batch.quantity);

  const percent =
    quantity > 0
      ? Math.round((remaining / quantity) * 100)
      : 0;

  // Total eggs consumed by everyone this month
  const monthlyConsumption = monthlySummary.reduce(
    (total, person) => total + Number(person.total_eggs || 0),
    0
  );

  // Days elapsed in the current month
  const today = new Date();

  const dayOfMonth = today.getDate();

  // Average consumption per day this month
  const averageDailyConsumption =
    dayOfMonth > 0
      ? monthlyConsumption / dayOfMonth
      : 0;

  // Estimated days of stock remaining
  const estimatedDays =
    averageDailyConsumption > 0
      ? Math.ceil(remaining / averageDailyConsumption)
      : null;

  let stockStatus = "🟢 Stock looks healthy";
  let statusClass = "text-green-600";

  if (percent <= 20) {
    stockStatus = "🔴 Very low stock";
    statusClass = "text-red-600";
  } else if (percent <= 35) {
    stockStatus = "⚠️ Low stock";
    statusClass = "text-orange-500";
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* Batch information */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            {batch.inventory_items.name}
          </h2>

          <p className="text-gray-500">
            Purchased on {batch.purchase_date}
          </p>

        </div>

        <div className="text-right">

          <p className="text-2xl font-bold">
            ₹{Number(batch.price).toFixed(2)}
          </p>

          <p className="text-xs text-gray-500">
            Batch price
          </p>

        </div>

      </div>

      {/* Remaining stock */}

      <div className="mt-6">

        <div className="flex justify-between">

          <span>
            Remaining
          </span>

          <span className="font-semibold">
            {remaining} / {quantity}{" "}
            {batch.inventory_items.unit}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

          <div
            className={`h-3 rounded-full transition-all ${percent <= 20
                ? "bg-red-500"
                : percent <= 35
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
            style={{
              width: `${Math.min(100, Math.max(0, percent))}%`,
            }}
          />

        </div>

        <p className="text-sm text-gray-500 mt-2">
          {percent}% remaining
        </p>

      </div>

      {/* Stock status */}

      <div className="mt-5">

        <p className={`font-semibold ${statusClass}`}>
          {stockStatus}
        </p>

        {estimatedDays !== null && (
          <p className="text-sm text-gray-500 mt-1">
            At your current usage, approximately{" "}
            <span className="font-semibold text-gray-700">
              {estimatedDays} days
            </span>{" "}
            of stock remain.
          </p>
        )}

        {estimatedDays === null && (
          <p className="text-sm text-gray-500 mt-1">
            Not enough consumption data to estimate usage yet.
          </p>
        )}

      </div>

    </div>
  );
}