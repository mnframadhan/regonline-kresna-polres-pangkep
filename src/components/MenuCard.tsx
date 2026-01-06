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
      className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-lg transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}
