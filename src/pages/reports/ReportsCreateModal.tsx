import { createReport } from "../../api/reports";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ReportsCreateModal({ open, onClose, onSuccess }: Props) {
  const [receivedAt, setReceivedAt] = useState("");
  const [reporter, setReporter] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date picker to UNIX time string
    const receivedAtUnix = Math.floor(new Date(receivedAt).getTime() / 1000).toString();

    await createReport({
      receivedAt: receivedAtUnix,
      reporter,
      recipient,
      subject,
      note
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Laporan Informasi</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            Tanggal Terima
            <input
              type="date"
              value={receivedAt}
              onChange={(e) => setReceivedAt(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block">
            Pelapor
            <input
              type="text"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block">
            Kepada
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block">
            Perihal
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

          <label className="block">
            Keterangan (opsional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </label>

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
