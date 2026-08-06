export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      {title && (
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}