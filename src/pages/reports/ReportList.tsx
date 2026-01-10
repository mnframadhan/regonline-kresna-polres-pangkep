import { useEffect, useState } from "react";
import { getReportsList, reportLatestRecord } from "../../api/reports";
import ReportsCreateModal from "./ReportsCreateModal";
import { PageHeader } from "../../components/PageHeader";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FloatingButton } from "@/components/LogoutBtn";
import Pagination from "@/components/Pagination";

export default function ReportsList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [latestNumber, setLatestNumber] = useState<number>(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getReportsList(year, limit, offset);
      setData(res.data);
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const loadLatest = async () => {
    const res = await reportLatestRecord();
    !res.register_number ? 1 : setLatestNumber(res.register_number)
  };

  // reload data saat year / page berubah
  useEffect(() => {
    loadData();
    loadLatest();
  }, [year, page]);

  // reset page saat tahun berubah
  useEffect(() => {
    setPage(1);
  }, [year]);

  return (
    <div className="uppercase p-6 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 min-h-screen">
      <FloatingButton />
      <PageHeader title="REGISTER LAPORAN INFORMASI" />

      <div className="flex justify-between items-center mb-6">
        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <div className="rounded shadow overflow-x-auto">

        {/* PAGINATION */}
        <Pagination
          page={page}
          limit={limit}
          dataLength={data.length}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
        {!loading ? (
          <>
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
                      <TableCell className="p-3">
                        {offset + i + 1}
                      </TableCell>
                      <TableCell className="p-3 text-nowrap">
                        {r.registerNumber}
                      </TableCell>
                      <TableCell className="p-3">
                        {new Date(Number(r.createdAt) * 1000).toLocaleDateString(
                          "id-ID",
                          { dateStyle: "long" }
                        )}
                      </TableCell>
                      <TableCell className="p-3">
                        {new Date(Number(r.receivedAt) * 1000).toLocaleDateString(
                          "id-ID",
                          { dateStyle: "long" }
                        )}
                      </TableCell>
                      <TableCell className="p-3">{r.reporter}</TableCell>
                      <TableCell className="min-w-[400px] border-r">
                        {r.subject}
                      </TableCell>
                      <TableCell className="p-3">{r.recipient}</TableCell>
                      <TableCell>{r.note}</TableCell>
                    </TableRow>
                  ))}

                  {data.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="p-4 text-center text-gray-500"
                      >
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>

          </>
        ) : (
          <Loading />
        )}

        <ReportsCreateModal
          open={openCreate}
          latestNumber={latestNumber}
          onClose={() => setOpenCreate(false)}
          onSuccess={loadData}
        />
      </div>
    </div>
  );
}
