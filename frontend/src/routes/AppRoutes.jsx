import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashbordLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import PDV from "../pages/PDV.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/pdv-terminal" element={<PDV/>}></Route>
      </Route>
    </Routes>
  );
}
