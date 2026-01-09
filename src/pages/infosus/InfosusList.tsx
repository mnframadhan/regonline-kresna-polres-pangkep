import { useEffect, useState } from "react";
import { getInfosusList, getLatestNumber } from "../../api/infosus";
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
    <div className="uppercase p-6 bg-yellow-200 min-h-screen">

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


      <div className="overflow-x-auto rounded shadow">
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
                      {new Date(Number(row.createdAt) * 1000).toLocaleDateString("id-ID", {
                        dateStyle: "long",
                      })}
                    </TableCell>
                    <TableCell className="p-3">{row.recipient}</TableCell>
                    <TableCell className="p-3">{row.summary}</TableCell>
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

