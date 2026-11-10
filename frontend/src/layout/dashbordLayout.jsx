import SideBar from "../components/sidebar";
import NavBar from "../components/navBar";
import { Outlet } from "react-router-dom";

function DashboardLayout(){
    return(
        <>
        <div className="flex">
            <SideBar />
            <main className="w-full h-screen flex flex-col">
                <NavBar />
                <Outlet />
            </main>
        </div>
        </>
    );
}

export default DashboardLayout