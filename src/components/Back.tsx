import { useNavigate } from "react-router-dom"

export const Back = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-gray-200 px-2 font-bold rounded cursor-pointer border-2 hover:bg-black hover:text-white mt-1"
    >Kembali</button>
  )
}
