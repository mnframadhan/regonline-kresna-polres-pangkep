import { useState } from "react";
import { createLapharsus } from "../../api/lapharsus";
import Loading from "../../components/Loading";
import { FormActions } from "../../components/FormActionModal";

type Props = {
  open: boolean;
  latestNumber: number;
  year: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function LapharsusCreateModal({
  open,
  latestNumber,
  year,
  onClose,
  onSuccess
}: Props) {
  if (!open) return null;

  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    try {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      await createLapharsus({
        unitNumber: form.unitNumber.value,
        summary: form.summary.value,
        region: form.region.value,
        note: form.note.value,
        month: form.month.value
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  };

  const romanMap = [
    "", "I", "II", "III", "IV", "V", "VI",
    "VII", "VIII", "IX", "X", "XI", "XII"
  ];

  const [value, setValue] = useState();

  // @ts-ignore
  const handleChange = (e) => {
    const num = Number(e.target.value);
    if (num >= 1 && num <= 12) {
      // @ts-ignore
      setValue(num);
    } else if (e.target.value === "") {
      // @ts-ignore
      setValue(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded p-6">
        <h2 className="text-lg font-bold mb-4">
          Tambah Lapharsus
        </h2>

        {!loading ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="block flex items-center gap-2">
              R / LHK -
              <input
                value={latestNumber + 1}
                className="w-12 bg-orange-200 text-center border rounded"
                disabled
              />
              /

              <input
                name="month"
                type="number"
                min={1}
                max={12}
                onChange={handleChange}
                className="w-12 text-center border rounded"
                required
              />
              <p><strong>{ // @ts-ignore
                romanMap[value]}</strong></p>
              /
              REN.
              <select
                name="unitNumber"
                className="border rounded px-3 py-2 mt-1"
                required
              >
                &nbsp;
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
              / &nbsp;
              {year}
              / &nbsp;
              SAT - IK
            </div>
            <input
              name="region"
              placeholder="Wilayah"
              required
              className="w-full border rounded px-3 py-2"
            />

            <textarea
              name="summary"
              placeholder="Uraian Singkat"
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              name="note"
              placeholder="Keterangan (opsional)"
              className="w-full border rounded px-3 py-2"
            />
            <FormActions onCancel={() => onClose()} />

          </form>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
