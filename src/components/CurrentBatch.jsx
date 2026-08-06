import Card from "./common/Card";

export default function CurrentBatch() {
  return (
    <Card title="Current Batch">
      <div className="space-y-4">

        <div>
          <p className="text-slate-500 text-sm">
            Item
          </p>

          <h3 className="text-2xl font-bold">
            🥚 Eggs
          </h3>
        </div>

        <div>
          <div className="w-full bg-slate-200 rounded-full h-3">

            <div
              className="bg-emerald-500 h-3 rounded-full"
              style={{ width: "60%" }}
            />

          </div>

          <p className="text-sm text-slate-500 mt-2">
            36 / 60 Remaining
          </p>
        </div>

        <div className="flex justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Cost / Egg
            </p>

            <p className="font-bold">
              ₹7.50
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Purchased
            </p>

            <p className="font-bold">
              60
            </p>
          </div>

        </div>

      </div>
    </Card>
  );
}