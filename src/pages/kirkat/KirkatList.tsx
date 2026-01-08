import { useEffect, useState } from "react";
import { getKirkatList } from "../../api/kirkat";
import KirkatCreateModal from "./KirkatCreateModal";
import { Back } from "../../components/Back";
import { getLatestNumber } from "../../api/kirkat";

export default function KirkatList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [latestNumber, setLatestNumber] = useState<number>(0)


  const loadData = async () => {
    const res = await getKirkatList(year);
    setData(res.data);
  };

  const loadLatest = async () => {
    const res = await getLatestNumber();

    !res.register_number ? 1 : setLatestNumber(res.register_number)

  };

  useEffect(() => {
    loadData();
    loadLatest();

  }, [year]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="flex flex-col">
          <span className="text-xl font-bold">Kirkat</span>
          <Back />
        </h1>

        <div className="flex gap-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            {[yearNow, yearNow - 1, yearNow - 2].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Nomor Kirkat</th>
              <th className="p-3">Tanggal Pembuatan</th>
              <th className="p-3">Kepada</th>
              <th className="p-3">Uraian Singkat</th>
              <th className="p-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((k, i) => (
              <tr key={k.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">
                  {k.nomorKirkat}
                </td>
                <td className="p-3">
                  {new Date(
                    Number(k.createdAt) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">{k.recipient}</td>
                <td className="p-3">{k.summary}</td>
                <td className="p-3">{k.note}</td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <KirkatCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
