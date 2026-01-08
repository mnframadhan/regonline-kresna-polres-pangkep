import { useEffect, useState } from "react";
import { getReportsList, reportLatestRecord } from "../../api/reports";
import ReportsCreateModal from "./ReportsCreateModal";
import { Back } from "../../components/Back";

export default function ReportsList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [latestNumber, setLatestNumber] = useState<number>(0)
  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    const res = await getReportsList(year);
    setData(res.data);
  };

  const loadLatest = async () => {
    const res = await reportLatestRecord();
    setLatestNumber(res.register_number)
  }


  useEffect(() => {
    loadData();
    loadLatest();
  }, [year]);

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="flex flex-col">
          <span className="text-xl font-bold ">Laporan Informasi</span>
          <Back />
        </h1>

        <div className="flex gap-2">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-4 py-1"
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
              <th className="p-3 text-left">No</th>
              <th className="p-3">Nomor Register</th>
              <th className="p-3">Tanggal Terima</th>
              <th className="p-3">Pelapor</th>
              <th className="p-3">Perihal</th>
              <th className="p-3">Kepada</th>
              <th className="p-3">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{r.registerNumber}</td>
                <td className="p-3">
                  {new Date(
                    Number(r.receivedAt) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">{r.reporter}</td>
                <td className="p-3">{r.subject}</td>
                <td className="p-3">{r.recipient}</td>
                <td className="p-3">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReportsCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
