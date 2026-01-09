import MenuCard from "../components/MenuCard";

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-extrabold">SAT INTELKAM POLRES PANGKEP</h1>
        <span className="text-2xl font-light">Register Online</span>
      </div>

      <div className="p-12 flex gap-4 items-center">
        <img className="max-w-40" src="/logo-kresna.png" />
        <div className="h-32 w-1 bg-slate-300" />
        <img className="max-w-48" src="/logo-sat-intelkam.png" />
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

