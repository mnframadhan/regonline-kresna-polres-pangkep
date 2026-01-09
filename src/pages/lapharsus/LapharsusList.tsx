import { useEffect, useState } from "react";
import { getLapharsusList, getLatestNumber } from "../../api/lapharsus";
import LapharsusCreateModal from "./LapharsusCreateModal";
import { PageHeader } from "../../components/PageHeader";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";

export default function LapharsusList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [latestNumber, setLatestNumber] = useState(0);
  const [loading, setLoading] = useState<boolean>(true)

  const loadData = async () => {
    try {
      const res = await getLapharsusList(year);
      setData(res.data);
    } catch (err) {
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  };

  const loadLatest = async () => {
    const res = await getLatestNumber();
    !res.register_number ? 1 : setLatestNumber(res.register_number)
  }

  useEffect(() => {
    loadData();
    loadLatest();
  }, [year]);

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">

      <PageHeader title="REGISTER LAPHARSUS" />

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
                <th className="p-3 w-80"><span className="text-nowrap">Nomor Lapharsus</span></th>
                <th className="p-3 w-32">Tanggal</th>
                <th className="p-3 w-32">Wilayah</th>
                <th className="p-3">Uraian</th>
                <th className="p-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((l, i) => (
                <tr key={l.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium text-nowrap">
                    {l.nomorLapharsus}
                  </td>
                  <td className="p-3">
                    {new Date(
                      Number(l.createdAt) * 1000
                    ).toLocaleDateString("id-ID", { dateStyle: "long" })}
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
        ) : (
          <Loading />
        )}
      </div>

      <LapharsusCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
