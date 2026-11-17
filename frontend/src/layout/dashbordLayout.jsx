import SideBar from "../components/Sidebar.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation} from "react-router-dom";

function DashboardLayout() {
    const location = useLocation()
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <NavBar />
          <div className="flex-1 min-h-0 p-4 overflow-hidden">
            <div key={location.pathname} className="h-full animate-page-enter">
              <Outlet />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
