import { useEffect, useState } from "react";
import { getKirkatList } from "../../api/kirkat";
import KirkatCreateModal from "./KirkatCreateModal";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import { PageHeader } from "../../components/PageHeader";
import Loading from "../../components/Loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FloatingButton } from "@/components/LogoutBtn";
import Pagination from "@/components/Pagination";

export default function KirkatList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState<boolean>(true)


  // pagination
  const [page, setPage] = useState(1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getKirkatList(year, limit, offset);
      setData(res.data);
    } catch (err) {
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    loadData();

  }, [year, page]);

  useEffect(() => {
    setPage(1);
  }, [year]);

  return (
    <div className="uppercase p-6 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 min-h-screen">

      <FloatingButton />
      <PageHeader title="REGISTER KIRKAT" />

      <div className="flex justify-between items-center mb-6">

        <YearSelectorWithAdd
          year={year}
          onYearChange={(y) => setYear(y)}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <KirkatCreateModal
        open={openCreate}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />

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

          <ScrollArea className="bg-white w-full rounded-md border mt-2">
            <Table className="w-full text-sm text-left">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-4 py-2">No</TableHead>
                  <TableHead className="px-4 py-2">Nomor Kirkat</TableHead>
                  <TableHead className="px-4 py-2">Tanggal</TableHead>
                  <TableHead className="px-4 py-2">Kepada</TableHead>
                  <TableHead className="px-4 py-2">Uraian Singkat</TableHead>
                  <TableHead className="px-4 py-2">Keterangan</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((k, i) => (
                  <TableRow key={k.id} className="border-t">
                    <TableCell className="p-3">{i + 1}</TableCell>
                    <TableCell className="p-3 font-medium text-nowrap">
                      {k.nomorKirkat}
                    </TableCell>
                    <TableCell className="p-3">
                      {new Date(Number(k.received_at) * 1000).toLocaleDateString("id-ID", {
                        dateStyle: "long",
                      })}
                    </TableCell>
                    <TableCell className="p-3">{k.recipient}</TableCell>
                    <TableCell className="p-3 min-w-[400px]">{k.summary}</TableCell>
                    <TableCell className="p-3">{k.note}</TableCell>
                  </TableRow>
                ))}

                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-4 text-center text-gray-500">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Loading />
        )}
      </div>

    </div>
  );
}
