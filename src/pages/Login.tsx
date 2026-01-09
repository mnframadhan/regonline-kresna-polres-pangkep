import { useState } from "react";
import { api } from "../api/client";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      // 1️⃣ simpan token
      setToken(res.data.token);
      // 2️⃣ validasi token + ambil user dari /auth/me
      await fetchMe();
      // 3️⃣ redirect
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-200 flex flex-col py-24 pt-12 items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="font-extrabold text-4xl">REGISTER ONLINE</h1>
        <span className="font-light text-2xl">Sat Intelkam Polres Pangkep</span>
      </div>

      <div className="my-12 flex gap-4 items-center">
        <img className="max-w-40" src="/logo-kresna.png" />
        <div className="h-32 w-1 bg-slate-300" />
        <img className="max-w-52" src="/logo-sat-intelkam.png" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
    </div>
  );
}
