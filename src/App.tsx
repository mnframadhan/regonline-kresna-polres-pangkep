import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProtectedRoute from "./components/ProtectedRoute";

import ReportsList from "./pages/reports/ReportList";
import KirkatList from "./pages/kirkat/KirkatList";
import LapharsusList from "./pages/lapharsus/LapharsusList";
import KirsusList from "./pages/kirsus/KirsusList";
import InfosusList from "./pages/infosus/InfosusList";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const { user, loading } = useAuthStore();

  if (loading) return null;

  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      {/* PROTECTED LAYOUT */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<Menu />} index />

        <Route path="reports" element={<ReportsList />} />
        <Route path="kirkat" element={<KirkatList />} />
        <Route path="lapharsus" element={<LapharsusList />} />
        <Route path="kirsus" element={<KirsusList />} />
        <Route path="infosus" element={<InfosusList />} />
      </Route>

      {/* FALLBACK → 404 BUKAN REDIRECT */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
