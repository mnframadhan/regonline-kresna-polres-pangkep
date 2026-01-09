import { useNavigate } from "react-router-dom"

export const Back = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-orange-300 px-4 py-2 font-bold rounded cursor-pointer border-black hover:bg-black hover:text-white"
    >&larr; KEMBALI</button>
  )
}
