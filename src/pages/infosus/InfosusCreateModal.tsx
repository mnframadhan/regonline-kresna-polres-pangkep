type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function InfosusCreateModal({
  open,
  onClose,
  onSuccess
}: Props) {
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const payload = {
      recipient: form.recipient.value,
      summary: form.summary.value,
      note: form.note.value
    };

    await fetch(`${import.meta.env.VITE_API_URL}/infosus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload)
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Infosus</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="recipient"
            placeholder="Kepada"
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="summary"
            placeholder="Uraian Singkat"
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="note"
            placeholder="Keterangan (opsional)"
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
