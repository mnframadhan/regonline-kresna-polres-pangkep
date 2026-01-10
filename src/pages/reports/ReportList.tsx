import { useEffect, useState } from "react";
import { getReportsList, reportLatestRecord } from "../../api/reports";
import ReportsCreateModal from "./ReportsCreateModal";
import { PageHeader } from "../../components/PageHeader";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="uppercase p-6 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 min-h-screen">
      <PageHeader title="REGISTER LAPORAN INFORMASI" />
      <div className="flex justify-between items-center mb-6">
        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <div className="rounded shadow overflow-x-auto">
        {!loading ? (
          <ScrollArea className="bg-white w-full rounded-md border mt-2">
            <Table className="w-full text-sm">
              <TableHeader className="bg-gray-100 text-left">
                <TableRow>
                  <TableHead className="px-4 py-2">No</TableHead>
                  <TableHead className="px-4 py-2">No. Register</TableHead>
                  <TableHead className="px-4 py-2">Tanggal Pembuatan</TableHead>
                  <TableHead className="px-4 py-2">Tanggal Terima</TableHead>
                  <TableHead className="px-4 py-2">Pelapor</TableHead>
                  <TableHead className="px-4 py-2">Perihal</TableHead>
                  <TableHead className="px-4 py-2">Kepada</TableHead>
                  <TableHead className="px-3 py-2">Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((r, i) => (
                  <TableRow key={r.id} className="border-t">
                    <TableCell className="p-3">{i + 1}</TableCell>
                    <TableCell className="p-3 text-nowrap">{r.registerNumber}</TableCell>
                    <TableCell className="p-3">
                      {new Date(
                        Number(r.createdAt) * 1000
                      ).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </TableCell>
                    <TableCell className="p-3">
                      {new Date(
                        Number(r.receivedAt) * 1000
                      ).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </TableCell>
                    <TableCell className="p-3">{r.reporter}</TableCell>
                    <TableCell className="min-w-[400px] border-r">{r.subject}</TableCell>
                    <TableCell className="p-3">{r.recipient}</TableCell>
                    <TableCell className="">{r.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="p-4 text-center text-gray-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Loading />
        )}

        <ReportsCreateModal
          open={openCreate}
          latestNumber={latestNumber}
          onClose={() => setOpenCreate(false)}
          onSuccess={loadData}
        />
      </div >
    </div>
  );
}
