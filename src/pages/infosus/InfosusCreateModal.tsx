import { useState } from "react";

type Props = {
  open: boolean;
  latestNumber: number;
  year: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function InfosusCreateModal({
  open,
  latestNumber,
  year,
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
      note: form.note.value,
      month: form.month.value
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
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Infosus</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <label className="block flex items-center gap-2">
            R / LIK /
            <input
              value={latestNumber + 1}
              className="w-12 bg-orange-200 text-center border rounded"
              disabled
            />
            / &nbsp;
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
            / &nbsp;
            {year}
          </label>


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
            placeholder="Keterangan"
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
