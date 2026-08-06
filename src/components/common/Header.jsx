import { LuEgg } from "react-icons/lu";

export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="flex justify-center items-center gap-3">
        <LuEgg className="text-emerald-500 text-4xl" />
        <h1 className="text-4xl font-bold text-slate-800">
          SplitBite
        </h1>
      </div>

      <p className="text-slate-500 mt-2">
        Track. Eat. Split Fairly.
      </p>
    </header>
  );
}