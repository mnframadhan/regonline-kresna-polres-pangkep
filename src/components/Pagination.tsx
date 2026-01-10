interface PaginationProps {
  page: number;
  limit: number;
  dataLength: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  limit,
  dataLength,
  onPrev,
  onNext
}: PaginationProps) {
  const isPrevDisabled = page === 1;
  const isNextDisabled = dataLength < limit;

  if (page === 1 && isNextDisabled) return null;

  return (
    <div className="flex justify-between items-center mt-4 bg-white p-3 rounded border">
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded disabled:opacity-40 disabled:cursor-default"
      >
        Sebelumnya
      </button>

      <span className="text-sm font-semibold">
        Hal. {page}
      </span>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded disabled:opacity-40 disabled:cursor-default"
      >
        Selanjutnya
      </button>
    </div>
  );
}
