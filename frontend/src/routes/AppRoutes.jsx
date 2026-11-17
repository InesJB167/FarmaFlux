import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashbordLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import PDV from "../pages/PDV.jsx";
import Lotes from "../pages/Lotes.jsx";
import Fornecedores from "../pages/Fornecedores.jsx"
import Relatorios from "../pages/Relatorios.jsx";
import Usuarios from "../pages/Usuarios.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/pdv-terminal" element={<PDV/>}></Route>
        <Route path="/stock" element={<Lotes/>}></Route>
        <Route path="/fornecedores" element={<Fornecedores/>}></Route>
        <Route path="/relatorios" element={<Relatorios/>}></Route>
        <Route path="/usuarios" element={<Usuarios/>}></Route>
      </Route>
    </Routes>
  );
}
