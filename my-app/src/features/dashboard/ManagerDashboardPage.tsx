import { useDashboard } from "@/Core/Hooks/Dashboard/useDashboard";
import FiltersBar from "./FiltersBar";
import OrdersTable from "./OrdersTable";
import BG from "../../../BG.jpg"
export default function ManagerDashboard() {
    const {
        filteredOrders,  
        isLoading,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab } = useDashboard();
        console.log(filteredOrders, isLoading, searchQuery, activeTab);
    return (
        <div className="w-full min-h-screen py-12" style={{ backgroundImage: `url(${BG})` }}>
            <div className="max-w-5xl mx-auto mt-12 flex flex-start flex-col">
                <span className="text-lg font-semi-bold text-red-color tracking-widest">MANAGER</span>
                <h1 className="text-3xl font-bold text-black-font tracking-widest ">
                    Dashboard
                </h1>
            </div>
            <div className="w-full min-h-screen py-12">
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    <FiltersBar
                        activeTab={activeTab}
                        searchQuery={searchQuery}
                        setActiveTab={setActiveTab}
                        setSearchQuery={setSearchQuery}
                    />
                    <OrdersTable orders={filteredOrders} />
                </div>
            </div>
        </div>
    );
}