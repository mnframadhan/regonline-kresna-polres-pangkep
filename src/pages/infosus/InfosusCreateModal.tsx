import { useState } from "react";
import Loading from "../../components/Loading";
import { FormActions } from "../../components/FormActionModal";

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

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    try {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      const payload = {

        received_at: Math.floor(new Date(form.received_at.value).getTime() / 1000).toString(),
        recipient: form.recipient.value,
        summary: form.summary.value,
        note: form.note.value == "" ? "-" : form.note.value,
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
    } catch (err) {
      alert("Terjadi Kesalahan");
    } finally {
      setLoading(false)
    }
  }

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
      <div className="bg-slate-200 w-full max-w-lg rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Infosus</h2>

        {!loading ? (

          <form onSubmit={handleSubmit} className="space-y-4">

            <label className="block flex items-center gap-2">
              R / LIK /
              <input
                value={latestNumber + 1}
                className="w-12 bg-yellow-200 border-black text-center border rounded"
                disabled
              />
              / &nbsp;
              <input
                name="month"
                type="number"
                min={1}
                max={12}
                onChange={handleChange}
                className="bg-white w-12 text-center border rounded"
                required
              />
              <p><strong>{ // @ts-ignore
                romanMap[value]}</strong></p>
              / &nbsp;
              {year}
            </label>

            Tanggal pembuatan
            <input
              type="date"
              name="received_at"
              required
              className="bg-white w-full border rounded px-3 py-2 mt-1" />

            kepada
            <input
              name="recipient"
              placeholder="Kepada"
              required
              className="bg-white w-full border rounded px-3 py-2"
            />

            uraian singkat
            <textarea
              name="summary"
              placeholder="Uraian Singkat"
              required
              className="bg-white w-full border rounded px-3 py-2"
            />

            Keterangan
            <textarea
              name="note"
              placeholder="Keterangan"
              className="bg-white w-full border rounded px-3 py-2"
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
