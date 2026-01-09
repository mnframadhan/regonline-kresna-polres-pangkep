import { useEffect, useState } from "react";
import { getKirkatList } from "../../api/kirkat";
import KirkatCreateModal from "./KirkatCreateModal";
import { getLatestNumber } from "../../api/kirkat";
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

export default function KirkatList() {
  const yearNow = new Date().getFullYear();

  const [year, setYear] = useState(yearNow);
  const [data, setData] = useState<any[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [latestNumber, setLatestNumber] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)


  const loadData = async () => {
    try {
      const res = await getKirkatList(year);
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

  };

  useEffect(() => {
    loadData();
    loadLatest();

  }, [year]);

  return (
    <div className="uppercase p-6 bg-yellow-200 min-h-screen">

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
        latestNumber={latestNumber}
        year={year}
        onClose={() => setOpenCreate(false)}
        onSuccess={loadData}
      />

      <div className="rounded shadow overflow-x-auto">
        {!loading ? (

          <ScrollArea className="bg-white w-full rounded-md border mt-2">
            <Table className="w-full text-sm text-left">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-4 py-2">No</TableHead>
                  <TableHead className="px-4 py-2">Nomor Kirkat</TableHead>
                  <TableHead className="px-4 py-2">Tanggal Pembuatan</TableHead>
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
                      {new Date(Number(k.createdAt) * 1000).toLocaleDateString("id-ID", {
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
