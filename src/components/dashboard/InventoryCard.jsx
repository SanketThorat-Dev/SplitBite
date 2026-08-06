export default function InventoryCard({ batch }) {
  const percent = Math.round(
    (batch.remaining_quantity / batch.quantity) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6">

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
            ₹{batch.price}
          </p>

        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between">

          <span>
            Remaining
          </span>

          <span className="font-semibold">
            {batch.remaining_quantity} / {batch.quantity} {batch.inventory_items.unit}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />

        </div>

      </div>

    </div>
  );
}