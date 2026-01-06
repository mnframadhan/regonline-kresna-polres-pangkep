import { useEffect, useState } from "react";
import { getLapharsusList } from "../../api/lapharsus";
import { useAuth } from "../../context/AuthContext";
import LapharsusCreateModal from "./LapharsusCreateModal";

export default function LapharsusList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    const res = await getLapharsusList(year);
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, [year]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Lapharsus</h1>

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
              <th className="p-3">Nomor Lapharsus</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Wilayah</th>
              <th className="p-3">Uraian</th>
              <th className="p-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((l, i) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">
                  {l.nomorLapharsus}
                </td>
                <td className="p-3">
                  {new Date(
                    Number(l.createdAt) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">{l.region}</td>
                <td className="p-3">{l.summary}</td>
                <td className="p-3">{l.note}</td>
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

      <LapharsusCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
