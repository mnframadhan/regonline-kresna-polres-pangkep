import { useNavigate } from "react-router-dom";

export default function MenuCard({
  title,
  path
}: {
  title: string;
  path: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer rounded-xl border-2 border-black bg-gradient-to-tr from-blue-500 via-blue-700 to-blue-500 p-6 text-white uppercase shadow hover:shadow-xl hover:bg-blue-900 hover:text-white transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}
