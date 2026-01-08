import { useEffect, useState } from "react";
import { getInfosusList, getLatestNumber } from "../../api/infosus";
import InfosusCreateModal from "./InfosusCreateModal";

type Infosus = {
  id: string;
  registerNumber: number;
  nomorInfosus: string;
  createdAt: string;
  recipient: string;
  summary: string;
  note: string;
};

export default function InfosusList() {

  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<Infosus[]>([]);
  const [latestNumber, setLatestNumber] = useState<number>(0);

  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    const res = await getInfosusList(year);
    setData(res.data);
  };


  const loadLatest = async () => {
    const res = await getLatestNumber();
    !res.register_number ? 1 : setLatestNumber(res.register_number)
  }

  useEffect(() => {
    loadData();
  }, [year]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">INFOSUS</h1>

        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-1"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[year, year - 1, year - 2].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>

          <InfosusCreateModal
            open={openCreate}
            latestNumber={latestNumber}
            year={year}
            onClose={() => setOpenCreate(false)}
            onSuccess={loadData}
          />
        </div>
      </div>


      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Nomor Infosus</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Kepada</th>
              <th className="p-3 text-left">Uraian</th>
              <th className="p-3 text-left">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium">
                  {row.nomorInfosus}
                </td>
                <td className="p-3">
                  {new Date(
                    Number(row.createdAt) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">{row.recipient}</td>
                <td className="p-3">{row.summary}</td>
                <td className="p-3">{row.note}</td>
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
    </div>
  );
}

