import SideBar from "../components/Sidebar.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout(){
    return(
        <>
        <div className="flex h-screen">
            <SideBar />
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <NavBar />
                <div className="flex-1 min-h-0 overflow-hidden p-4">
                    <Outlet />
                </div>
                <Footer/>
            </main>
        </div>
        </>
    );
}

export default DashboardLayout