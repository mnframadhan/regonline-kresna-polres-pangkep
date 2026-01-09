import { useEffect, useState } from "react";
import { getInfosusList, getLatestNumber } from "../../api/infosus";
import InfosusCreateModal from "./InfosusCreateModal";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";
import { PageHeader } from "../../components/PageHeader";

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
  const [loading, setLoading] = useState<boolean>(true)

  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    try {
      const res = await getInfosusList(year);
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
    loadLatest();
    loadData();
  }, [year]);

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">

      <PageHeader title="REGISTER INFOSUS" />
      <div className="flex justify-between items-center mb-6">

        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>


      <InfosusCreateModal
        open={openCreate}
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />


      <div className="overflow-x-auto bg-white rounded shadow">
        {!loading ? (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 w-10">No</th>
                <th className="p-3 w-48">Nomor Infosus</th>
                <th className="p-3 w-32">Tanggal</th>
                <th className="p-3 w-32">Kepada</th>
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
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

