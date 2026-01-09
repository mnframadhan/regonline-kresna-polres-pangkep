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
            <div className="flex w-full">
              R / LHK - &nbsp;
              <input
                value={latestNumber + 1}
                className="w-12 bg-orange-200 text-center border rounded"
                disabled
              />
              &nbsp;/&nbsp;
              <input
                name="month"
                type="number"
                min={1}
                max={12}
                onChange={handleChange}
                className="w-12 text-center border rounded"
                required
              />
              <span>
                <strong>{
                  // @ts-ignore
                  romanMap[value]}
                </strong>
              </span>
              &nbsp;
              /REN.4.4 &nbsp;
              &nbsp;
            </div>
            /
            {year} &nbsp;
            SAT - IK
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
