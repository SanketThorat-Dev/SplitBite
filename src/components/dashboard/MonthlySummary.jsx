export default function MonthlySummary({ summary }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-5">

      <h2 className="text-xl font-bold mb-4">
        📊 This Month
      </h2>

      <div className="space-y-3">

        {summary.map((person) => (

          <div
            key={person.roommate_id}
            className="flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">
                {person.roommate_name}
              </p>

              <p className="text-sm text-gray-500">
                🥚 {person.total_eggs}
              </p>

            </div>

            <p className="font-bold">
              ₹{Number(person.total_amount).toFixed(2)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}