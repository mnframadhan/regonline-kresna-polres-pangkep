import { useState } from "react";
import { createKirsus } from "../../api/kirsus";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function KirsusCreateModal({ open, onClose, onSuccess }: Props) {
  const [unitNumber, setUnitNumber] = useState("");
  const [recipient, setRecipient] = useState("");
  const [cc, setCc] = useState("");
  const [summary, setSummary] = useState("");
  const [opsType, setOpsType] = useState("");
  const [note, setNote] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createKirsus({
      unitNumber,
      recipient,
      cc,
      summary,
      ops_type: opsType,
      note: note || undefined
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Kirsus</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nomor Unit"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Kepada"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Tembusan"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            placeholder="Uraian Singkat"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Ops Type"
            value={opsType}
            onChange={(e) => setOpsType(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            placeholder="Keterangan (opsional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
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
