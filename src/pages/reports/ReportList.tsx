import { useEffect, useState } from "react";
import { getReportsList, reportLatestRecord } from "../../api/reports";
import ReportsCreateModal from "./ReportsCreateModal";
import { PageHeader } from "../../components/PageHeader";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";

export default function ReportsList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [latestNumber, setLatestNumber] = useState<number>(0)
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState<boolean>(true)

  const loadData = async () => {
    try {
      const res = await getReportsList(year);
      setData(res.data);
    } catch (err) {
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
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
    <div className="p-6 bg-yellow-200 min-h-screen">
      <PageHeader title="REGISTER LAPORAN INFORMASI" />
      <div className="flex justify-between items-center mb-6">
        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        {!loading ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 w-10">No</th>
                <th className="p-3 w-32">No. Register</th>
                <th className="p-3 w-32 p-3">Tanggal Terima</th>
                <th className="p-3 w-32 p-3">Pelapor</th>
                <th className="p-3">Perihal</th>
                <th className="w-40 p-3">Kepada</th>
                <th className="p-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 text-nowrap">{r.registerNumber}</td>
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
        ) : (
          <Loading />
        )}
      </div>

      <ReportsCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div >
  );
}
