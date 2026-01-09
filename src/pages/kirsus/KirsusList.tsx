import { useEffect, useState } from "react";
import { getKirsusList, getLatestNumber } from "../../api/kirsus";
import KirsusCreateModal from "./KirsusCreateModal";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import { PageHeader } from "../../components/PageHeader";
import Loading from "../../components/Loading";

export default function KirsusList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [latestNumber, setLatestNumber] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const res = await getKirsusList(year);
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

      <PageHeader title="REGISTER KIRSUS" />

      <div className="flex justify-between items-center mb-6">

        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <KirsusCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
      <div className="bg-white rounded shadow overflow-x-auto">
        {!loading ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 w-10">No</th>
                <th className="p-3 w-36">Nomor Kirsus</th>
                <th className="p-3 w-36">Tanggal</th>
                <th className="p-3 w-20">Kepada</th>
                <th className="p-3">Tembusan</th>
                <th className="p-3">Perihal</th>
                <th className="p-3">Jenis Ops</th>
                <th className="p-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((k, i) => (
                <tr key={k.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium text-nowrap">
                    {k.nomorKirsus}
                  </td>
                  <td className="p-3">
                    {new Date(
                      Number(k.createdAt) * 1000
                    ).toLocaleDateString("id-ID", { dateStyle: "long" })}
                  </td>
                  <td className="p-3">{k.recipient}</td>
                  <td className="p-3">{k.cc}</td>
                  <td className="p-3">{k.summary}</td>
                  <td className="p-3">{k.ops_type}</td>
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
        ) : (
          <Loading />
        )}
      </div>

      <KirsusCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
