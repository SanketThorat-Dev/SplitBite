export default function ActivityCard({ activity }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-5">

      <h2 className="text-xl font-bold mb-4">
        📋 Today's Activity
      </h2>

      <div className="space-y-3">

        {activity.map((person) => (

          <div
            key={person.roommate_id}
            className="flex justify-between items-center"
          >

            <span className="font-medium">

              {person.roommate_name}

            </span>

            <span className="font-bold text-green-600">

              🥚 {person.total_quantity}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}