import Card from "./common/Card";

const summary = [
  {
    name: "Sanket",
    eggs: 34,
    amount: 255,
  },
  {
    name: "Omkar",
    eggs: 18,
    amount: 135,
  },
  {
    name: "Ajinkya",
    eggs: 8,
    amount: 60,
  },
  {
    name: "Onkar",
    eggs: 8,
    amount: 60,
  },
];

export default function SummaryCard() {
  return (
    <Card title="Monthly Summary">
      <div className="space-y-4">
        {summary.map((user) => (
          <div
            key={user.name}
            className="flex justify-between"
          >
            <div>
              <p className="font-semibold">
                {user.name}
              </p>

              <p className="text-sm text-slate-500">
                {user.eggs} Eggs
              </p>
            </div>

            <p className="font-bold text-emerald-600">
              ₹{user.amount}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}