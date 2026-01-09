import { useNavigate } from "react-router-dom"

export const Back = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-blue-600 px-4 py-2 font-bold rounded cursor-pointer border-black hover:bg-blue-900 text-white"
    >&larr; KEMBALI</button>
  )
}
