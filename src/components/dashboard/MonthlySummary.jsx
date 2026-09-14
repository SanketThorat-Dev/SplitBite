export default function MonthlySummary({ summary }) {
  const totalEggs = summary.reduce(
    (total, person) => total + Number(person.total_eggs),
    0
  );

  const totalAmount = summary.reduce(
    (total, person) => total + Number(person.total_amount),
    0
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 mt-5 text-gray-900 dark:text-gray-100">

      <h2 className="text-xl font-bold mb-2">
        📊 This Month
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Roommate consumption breakdown
      </p>

      {summary.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No consumption this month yet.
        </p>
      )}

      <div className="space-y-4">

        {summary.map((person) => {

          const eggs = Number(person.total_eggs);
          const amount = Number(person.total_amount);

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

              {/* Consumption percentage bar */}

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

      {summary.length > 0 && (
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