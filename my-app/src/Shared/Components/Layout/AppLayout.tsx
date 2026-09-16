import { Outlet } from "react-router-dom";
import AppNavbar from "../Navbar/AppNavbar";
import BG from "../../../../BG.jpg";

export default function AppLayout() {
    return (
        <div
            className="w-full min-h-screen py-6 px-4 sm:px-6"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                <AppNavbar />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
