import Card from "./common/Card";

const activities = [
  {
    id: 1,
    roommate: "Sanket",
    quantity: 2,
    time: "8:30 AM",
  },
  {
    id: 2,
    roommate: "Omkar",
    quantity: 1,
    time: "9:15 AM",
  },
  {
    id: 3,
    roommate: "Ajinkya",
    quantity: 3,
    time: "11:40 AM",
  },
  {
    id: 4,
    roommate: "Onkar",
    quantity: 3,
    time: "11:50 AM",
  },
];

export default function ActivityList() {
  return (
    <Card title="Today's Activity">
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium">{activity.roommate}</p>
              <p className="text-sm text-slate-500">
                {activity.time}
              </p>
            </div>

            <span className="font-bold text-emerald-600">
              +{activity.quantity} 🥚
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}