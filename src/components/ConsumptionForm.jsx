import { useState } from "react";
import Card from "./common/Card";

export default function ConsumptionForm() {
  const [roommate, setRoommate] = useState("Sanket");
  const [quantity, setQuantity] = useState(2);

  const handleSave = () => {
    alert(`${roommate} ate ${quantity} egg(s) today`);
  };

  return (
    <Card title="Today's Consumption">
      <div className="space-y-5">
        {/* Roommate Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Roommate
          </label>

          <select
            value={roommate}
            onChange={(e) => setRoommate(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>Sanket</option>
            <option>Omkar</option>
            <option>Ajinkya</option>
            <option>Onkar</option>
          </select>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Eggs Consumed
          </label>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
              className="w-12 h-12 rounded-full bg-slate-200 text-xl font-bold hover:bg-slate-300 transition"
            >
              −
            </button>

            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800">
                {quantity}
              </div>
              <div className="text-sm text-slate-500">
                egg{quantity !== 1 ? "s" : ""}
              </div>
            </div>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-emerald-500 text-white text-xl font-bold hover:bg-emerald-600 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Log Consumption
        </button>
      </div>
    </Card>
  );
}   