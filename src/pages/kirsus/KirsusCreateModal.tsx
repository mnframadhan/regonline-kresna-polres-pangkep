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
  const [unitNumber, setUnitNumber] = useState("");
  const [recipient, setRecipient] = useState("");
  const [cc, setCc] = useState("");
  const [summary, setSummary] = useState("");
  const [opsType, setOpsType] = useState("");
  const [note, setNote] = useState("");
  const [month, setMonth] = useState<number>(0);

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

      await createKirsus({
        unitNumber,
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
            <div className="flex flex-col gap-2 w-full">
              <div>
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

                <p className="text-center">
                  <strong>{romanMap[month]}</strong>
                </p>
              </div>
              <div>
                / REN. &nbsp;
                <select
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  required
                  className="border rounded  py-2"
                >
                  <option value="">- Pilih -</option>
                  <optgroup label="Urbin">
                    <option value="Urbin 1">Urbin 1</option>
                    <option value="Urbin 2">Urbin 2</option>
                    <option value="Urbin 3">Urbin 3</option>
                  </optgroup>
                  <optgroup label="Urmin">
                    <option value="Urmin 1">Urmin 1</option>
                    <option value="Urmin 2">Urmin 2</option>
                    <option value="Urmin 3">Urmin 3</option>
                  </optgroup>
                  <optgroup label="Uryan">
                    <option value="Uryan 1">Uryan 1</option>
                    <option value="Uryan 2">Uryan 2</option>
                    <option value="Uryan 3">Uryan 3</option>
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
              </div>
              / {year}
            </div>
            <div>

            </div>

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
