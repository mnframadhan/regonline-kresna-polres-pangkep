import MenuCard from "../components/MenuCard";

export default function Menu() {
  return (
    <div className="uppercase flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-extrabold text-center">SAT INTELKAM POLRES PANGKEP</h1>
        <span className="text-2xl font-semibold text-center">Register Online Produk</span>
        <span className="text-lg font-light italic text-center">"bekerja sama-sama, sama-sama bekerja"</span>
      </div>

      <div className="my-12 flex gap-4 items-center">
        <img className="w-32" src="/logo-kresna.png" />
        <div className="h-32 w-[1px] bg-slate-500" />
        <img className="w-42" src="/logo-sat-intelkam.png" />
      </div>

      <div className="flex flex-col gap-2 w-80">
        <MenuCard title="Laporan Informasi" path="/reports" />
        <MenuCard title="Kirkat" path="/kirkat" />
        <MenuCard title="Lapharsus" path="/lapharsus" />
        <MenuCard title="Kirsus" path="/kirsus" />
        <MenuCard title="Infosus" path="/infosus" />
      </div>
    </div>
  );
}

