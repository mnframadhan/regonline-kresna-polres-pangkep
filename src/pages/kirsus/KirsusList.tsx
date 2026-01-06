import { useEffect, useState } from "react";
import { getKirsusList } from "../../api/kirsus";
import KirsusCreateModal from "./KirsusCreateModal";

export default function KirsusList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    const res = await getKirsusList(year);
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, [year]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Kirsus</h1>

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
              <th className="p-3">Nomor Kirsus</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Kepada</th>
              <th className="p-3">Uraian</th>
              <th className="p-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((k, i) => (
              <tr key={k.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">
                  {k.nomorKirsus}
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

      <KirsusCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
