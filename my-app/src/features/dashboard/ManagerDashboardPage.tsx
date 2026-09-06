import { useDashboard } from "@/Core/Hooks/Dashboard/useDashboard";
import FiltersBar from "./FiltersBar";
import OrdersTable from "./OrdersTable";
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
    );
}