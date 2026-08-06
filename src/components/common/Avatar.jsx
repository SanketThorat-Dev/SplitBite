export default function Avatar({ name, size = "lg" }) {
  const initial = name?.charAt(0).toUpperCase();

  const sizes = {
    sm: "w-10 h-10 text-lg",
    md: "w-14 h-14 text-xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md`}
    >
      {initial}
    </div>
  );
}