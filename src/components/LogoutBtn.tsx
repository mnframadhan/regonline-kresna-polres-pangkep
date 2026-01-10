import { useNavigate } from "react-router-dom";

export function FloatingButton() {

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={() => {
        localStorage.removeItem("token")
        navigate("/login")
        window.location.reload()
      }} className="cursor-pointer rounded bg-red-600 text-white px-4 py-3 shadow-lg hover:bg-red-900 transition">
        Logout
      </button>
    </div>
  );
}
