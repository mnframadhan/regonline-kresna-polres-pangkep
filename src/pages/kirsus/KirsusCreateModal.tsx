import { useState } from "react";
import { createKirsus } from "../../api/kirsus";
import Loading from "../../components/Loading";
import { FormActions } from "../../components/FormActionModal";

type Props = {
  open: boolean;
  latestNumber: number;
  year: number;
  onClose: () => void;
  onSuccess: () => void;
};

const romanMap = [
  "", "I", "II", "III", "IV", "V", "VI",
  "VII", "VIII", "IX", "X", "XI", "XII"
];

export default function KirsusCreateModal({
  open,
  latestNumber,
  year,
  onClose,
  onSuccess
}: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [recipient, setRecipient] = useState("");
  const [cc, setCc] = useState("");
  const [summary, setSummary] = useState("");
  const [opsType, setOpsType] = useState("");
  const [note, setNote] = useState("");
  const [month, setMonth] = useState<number>(0);
  const [receivedAt, setReceivedAt] = useState("");

  if (!open) return null;

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num >= 1 && num <= 12) {
      setMonth(num);
    } else {
      setMonth(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    try {
      e.preventDefault();
      const receivedAtUnix = Math.floor(new Date(receivedAt).getTime() / 1000).toString();

      await createKirsus({
        received_at: receivedAtUnix,
        month,
        recipient,
        cc,
        summary,
        ops_type: opsType,
        note: note || undefined
      });

      onSuccess();
      onClose();
    } catch (err) {
      alert("Terjadi Kesalahan")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Kirsus</h2>

        {!loading ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex w-full">
              R / KIRSUS -
              <input
                value={latestNumber + 1}
                className="w-12 bg-orange-200 text-center border rounded"
                disabled
              />
              &nbsp;/ &nbsp;
              <input
                type="number"
                min={1}
                max={12}
                onChange={handleMonthChange}
                value={month || ""}
                className="w-12 text-center border rounded"
                required
              />
              &nbsp;
              <span className="text-center">
                <strong>{romanMap[month]}</strong>
              </span>
              &nbsp;
              / {year}
            </div>
            <div>

            </div>

            <input
              type="date"
              value={receivedAt}
              onChange={(e) => setReceivedAt(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
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
              placeholder="Perihal"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Jenis Ops"
              value={opsType}
              onChange={(e) => setOpsType(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />

            <textarea
              placeholder="Keterangan"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <FormActions
              onCancel={() => onClose()}
            />
          </form>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
