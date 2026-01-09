type Props = {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
};

export function FormActions({
  onCancel,
  submitLabel = "Simpan",
  cancelLabel = "Batal",
  isLoading = false,
}: Props) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer text-white bg-red-600 hover:bg-red-900 px-4 py-2 border rounded"
        disabled={isLoading}
      >
        {cancelLabel}
      </button>

      <button
        type="submit"
        className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60 hover:bg-green-900"
        disabled={isLoading}
      >
        {isLoading ? "Menyimpan..." : submitLabel}
      </button>
    </div>
  );
}
