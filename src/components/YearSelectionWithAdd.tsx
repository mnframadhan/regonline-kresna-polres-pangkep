import { Back } from "./Back";

type Props = {
  year: number;
  onYearChange: (year: number) => void;
  onAdd: () => void;
};

export function YearSelectorWithAdd({ year, onYearChange, onAdd }: Props) {
  const currentYear = new Date().getFullYear();

  const years = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <div className="w-full flex justify-between font-bold case-upper ">
      <div className="flex gap-2">
        <Back />
        <button
          onClick={onAdd}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#ce7d31]"
        >
          + TAMBAH </button>
      </div>
      <select
        className="border rounded px-4 py-2"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
