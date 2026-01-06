import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProtectedRoute from "./components/ProtectedRoute";

import ReportsList from "./pages/reports/ReportList";
import KirkatList from "./pages/kirkat/KirkatList";
import LapharsusList from "./pages/lapharsus/LapharsusList";
import KirsusList from "./pages/kirsus/KirsusList";
import InfosusList from "./pages/infosus/InfosusList";
import Register from "./Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Menu />} />

        <Route path="/reports" element={<ReportsList />} />
        <Route path="/kirkat" element={<KirkatList />} />
        <Route path="/lapharsus" element={<LapharsusList />} />
        <Route path="/kirsus" element={<KirsusList />} />
        <Route path="/infosus" element={<InfosusList />} />
      </Route>
    </Routes>
  );
}
