import { createReport, reportLatestRecord } from "../../api/reports";
import { useEffect, useState } from "react";
import { FormActions } from "../../components/FormActionModal";
import Loading from "../../components/Loading";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ReportsCreateModal({ open, onClose, onSuccess }: Props) {

  const [receivedAt, setReceivedAt] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [reporter, setReporter] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<boolean>(false)

  const [latestNumber, setLatestNumber] = useState<number>(0);

  const loadLatest = async () => {
    const res = await reportLatestRecord();
    !res.register_number ? 1 : setLatestNumber(res.register_number)
  };

  useEffect(() => {
    loadLatest();
  }, [])

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert date picker to UNIX time string
      const receivedAtUnix = Math.floor(new Date(receivedAt).getTime() / 1000).toString();
      const created_atUnix = Math.floor(new Date(created_at).getTime() / 1000).toString();

      setLoading(true)

      await createReport({
        receivedAt: receivedAtUnix,
        created_at: created_atUnix,
        reporter,
        recipient,
        subject,
        note
      });

      onSuccess();
      onClose();
    } catch (err) { alert("terjadi Kesalahan") } finally { setLoading(false) }

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-slate-200 w-full max-w-xl rounded p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Laporan Informasi</h2>

        {!loading ? (
          <form onSubmit={handleSubmit} className="space-y-3">

            <label className="block flex items-center gap-2">
              Nomor Register
              <input
                value={latestNumber + 1}
                className="w-12 bg-yellow-200 font-bold border-black text-center border rounded"
                disabled
              />
            </label>

            <label className="block">
              Tanggal Pembuatan
              <input
                type="date"
                value={created_at}
                onChange={(e) => setCreated_at(e.target.value)}
                required
                className="bg-white w-full border rounded px-3 py-2 mt-1"
              />
            </label>
            <label className="block">
              Tanggal Penerimaan
              <input
                type="date"
                value={receivedAt}
                onChange={(e) => setReceivedAt(e.target.value)}
                required
                className="bg-white w-full border rounded px-3 py-2 mt-1"
              />
            </label>

            <label className="block">
              Pelapor
              <select
                name="reporter"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                className="bg-white w-full border rounded px-3 py-2 mt-1"
                required
              >
                <option>-- Pilih --</option>
                <optgroup label="Urbin">
                  <option value="Urbin 1">Urbin 1</option>
                  <option value="Urbin 2">Urbin 2</option>
                  <option value="Urbin 3">Urbin 3</option>
                  <option value="Urbin 4">Urbin 4</option>
                  <option value="Urbin 5">Urbin 5</option>
                </optgroup>
                <optgroup label="Urmin">
                  <option value="Urmin 1">Urmin 1</option>
                  <option value="Urmin 2">Urmin 2</option>
                  <option value="Urmin 3">Urmin 3</option>
                  <option value="Urmin 4">Urmin 4</option>
                  <option value="Urmin 5">Urmin 5</option>
                </optgroup>
                <optgroup label="Uryan">
                  <option value="Uryan 1">Uryan 1</option>
                  <option value="Uryan 2">Uryan 2</option>
                  <option value="Uryan 3">Uryan 3</option>
                  <option value="Uryan 4">Uryan 4</option>
                  <option value="Uryan 5">Uryan 5</option>
                </optgroup>
                <optgroup label="UNIT 1">
                  <option value="1.1">1.1</option>
                  <option value="1.2">1.2</option>
                  <option value="1.3">1.3</option>
                  <option value="1.4">1.4</option>
                  <option value="1.5">1.5</option>
                  <option value="1.6">1.6</option>
                </optgroup>
                <optgroup label="UNIT 2">
                  <option value="2.1">2.1</option>
                  <option value="2.2">2.2</option>
                  <option value="2.3">2.3</option>
                  <option value="2.4">2.4</option>
                  <option value="2.5">2.5</option>
                  <option value="2.6">2.6</option>
                </optgroup>
                <optgroup label="UNIT 3">
                  <option value="3.1">3.1</option>
                  <option value="3.2">3.2</option>
                  <option value="3.3">3.3</option>
                  <option value="3.4">3.4</option>
                  <option value="3.5">3.5</option>
                  <option value="3.6">3.6</option>
                </optgroup>
                <optgroup label="UNIT 4">
                  <option value="4.1">4.1</option>
                  <option value="4.2">4.2</option>
                  <option value="4.3">4.3</option>
                  <option value="4.4">4.4</option>
                  <option value="4.5">4.5</option>
                  <option value="4.6">4.6</option>
                </optgroup>
              </select>
            </label>

            <label className="block">
              Kepada
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="bg-white w-full border rounded px-3 py-2 mt-1"
              />
            </label>

            <label className="block">
              Perihal
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="bg-white w-full border rounded px-3 py-2 mt-1"
              />
            </label>

            <label className="block">
              Keterangan
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-white w-full border rounded px-3 py-2 mt-1"
              />
            </label>

            <FormActions onCancel={() => onClose()} />
          </form>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
