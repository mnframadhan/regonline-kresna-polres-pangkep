import { useEffect, useState } from "react";
import { createLapharsus, getLatestNumber } from "../../api/lapharsus";
import Loading from "../../components/Loading";
import { FormActions } from "../../components/FormActionModal";

type Props = {
  open: boolean;
  year: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function LapharsusCreateModal({
  open,
  year,
  onClose,
  onSuccess
}: Props) {
  if (!open) return null;

  const [loading, setLoading] = useState<boolean>(false)
  const [latestNumber, setLatestNumber] = useState<number>(0)

  const loadLatest = async () => {
    const res = await getLatestNumber();
    !res.register_number ? 1 : setLatestNumber(res.register_number)
  }

  useEffect(() => {
    loadLatest();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    try {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      await createLapharsus({
        received_at: Math.floor(new Date(form.received_at.value).getTime() / 1000).toString(),
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
      <div className="bg-slate-200 w-full max-w-xl rounded p-6">
        <h2 className="text-lg font-bold mb-4">
          Tambah Lapharsus
        </h2>

        {!loading ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex w-full">
              R / LHK - &nbsp;
              <input
                value={latestNumber + 1}
                className="w-12 bg-yellow-200 border-black text-center border rounded"
                disabled
              />
              &nbsp;/&nbsp;
              <input
                name="month"
                type="number"
                min={1}
                max={12}
                onChange={handleChange}
                className="bg-white w-12 text-center border rounded"
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

            <br />
            <br />
            Tanggal Pembuatan
            <input
              type="date"
              name="received_at"
              required
              className="bg-white w-full border rounded px-3 py-2 mt-1" />

            Wilayah
            <input
              name="region"
              placeholder="Wilayah"
              required
              className="bg-white w-full border rounded px-3 py-2"
            />

            Uraian Singkat
            <textarea
              name="summary"
              placeholder="Uraian Singkat"
              required
              className="bg-white w-full border rounded px-3 py-2"
            />

            Keterangan
            <input
              name="note"
              placeholder="Keterangan"
              className="bg-white w-full border rounded px-3 py-2"
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
