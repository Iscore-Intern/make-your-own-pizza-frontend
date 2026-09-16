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
        setActiveTab,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="bg-white-color rounded-2xl border-2 border-black-font border-r-6 border-b-6 p-8 font-bold text-black-font text-lg">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-start flex-col">
                <span className="text-sm font-bold text-red-color tracking-widest uppercase">
                    Manager Portal
                </span>
                <h1 className="text-3xl font-extrabold text-black-font tracking-wide">
                    Orders Dashboard
                </h1>
            </div>

            <FiltersBar
                activeTab={activeTab}
                searchQuery={searchQuery}
                setActiveTab={setActiveTab}
                setSearchQuery={setSearchQuery}
            />
            <OrdersTable orders={filteredOrders} />
        </div>
    );
}