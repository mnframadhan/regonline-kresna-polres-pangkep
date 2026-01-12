import { useEffect, useState } from "react";
import { getInfosusList } from "../../api/infosus";
import InfosusCreateModal from "./InfosusCreateModal";
import { YearSelectorWithAdd } from "../../components/YearSelectionWithAdd";
import Loading from "../../components/Loading";
import { PageHeader } from "../../components/PageHeader";
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

type Infosus = {
  id: string;
  registerNumber: number;
  nomorInfosus: string;
  received_at: string;
  recipient: string;
  summary: string;
  note: string;
};

export default function InfosusList() {

  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<Infosus[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  // pagination
  const [page, setPage] = useState(1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getInfosusList(year, limit, offset);
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


  // reset page saat tahun berubah
  useEffect(() => {
    setPage(1);
  }, [year]);

  return (
    <div className="uppercase p-6 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 min-h-screen">

      <FloatingButton />
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
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />

      <div className="overflow-x-auto rounded shadow">

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
                  <TableHead className="p-3 w-10">No</TableHead>
                  <TableHead className="p-3 w-48">Nomor Infosus</TableHead>
                  <TableHead className="p-3 w-32">Tanggal</TableHead>
                  <TableHead className="p-3 w-32">Kepada</TableHead>
                  <TableHead className="p-3 text-left">Uraian</TableHead>
                  <TableHead className="p-3 text-left">Keterangan</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={row.id} className="border-t">
                    <TableCell className="p-3">{idx + 1}</TableCell>
                    <TableCell className="p-3 font-medium text-nowrap">
                      {row.nomorInfosus}
                    </TableCell>
                    <TableCell className="p-3">
                      {new Date(Number(row.received_at) * 1000).toLocaleDateString("id-ID", {
                        dateStyle: "long",
                      })}
                    </TableCell>
                    <TableCell className="p-3">{row.recipient}</TableCell>
                    <TableCell className="p-3 min-w-[400px]">{row.summary}</TableCell>
                    <TableCell className="p-3">{row.note}</TableCell>
                  </TableRow>
                ))}

                {data.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
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
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

