import MenuCard from "../components/MenuCard";

export default function Menu() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Menu Aplikasi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MenuCard title="Laporan Informasi" path="/reports" />
        <MenuCard title="Kirkat" path="/kirkat" />
        <MenuCard title="Lapharsus" path="/lapharsus" />
        <MenuCard title="Kirsus" path="/kirsus" />
        <MenuCard title="Infosus" path="/infosus" />
      </div>
    </div>
  );
}

