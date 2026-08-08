import { useEffect, useState } from "react";
import { getBatchPriceHistory } from "../../services/inventory";

export default function PriceHistory() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPriceHistory() {
    try {
      const data = await getBatchPriceHistory();
      setBatches(data);
    } catch (err) {
      console.error("Failed to load price history:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPriceHistory();
  }, []);

  const prices = batches
    .map((batch) => {
      const quantity = Number(batch.quantity);
      const price = Number(batch.price);

      return quantity > 0 ? price / quantity : 0;
    })
    .filter((price) => price > 0);

  const averagePrice =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) /
        prices.length
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-5">

      <h2 className="text-xl font-bold mb-2">
        💰 Egg Price History
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Price per egg across your batches
      </p>

      {loading && (
        <p className="text-gray-500">
          Loading price history...
        </p>
      )}

      {!loading && batches.length === 0 && (
        <p className="text-gray-500">
          No batch history available yet.
        </p>
      )}

      {!loading && batches.length > 0 && (
        <>
          <div className="space-y-3">

            {batches.map((batch) => {
              const quantity = Number(batch.quantity);
              const price = Number(batch.price);

              const pricePerEgg =
                quantity > 0
                  ? price / quantity
                  : 0;

              const date = new Date(
                batch.purchase_date + "T00:00:00"
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={batch.id}
                  className="flex justify-between items-center border-b pb-3 last:border-b-0"
                >

                  <div>

                    <p className="font-semibold">
                      {date}
                    </p>

                    <p className="text-sm text-gray-500">
                      {quantity} eggs · ₹
                      {price.toFixed(2)} total
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold">
                      ₹{pricePerEgg.toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-500">
                      per egg
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="border-t mt-5 pt-5 flex justify-between">

            <span className="font-semibold">
              Average price
            </span>

            <span className="font-bold">
              ₹{averagePrice.toFixed(2)} / egg
            </span>

          </div>
        </>
      )}

    </div>
  );
}