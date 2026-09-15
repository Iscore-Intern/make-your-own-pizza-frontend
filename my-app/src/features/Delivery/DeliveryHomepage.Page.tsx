import { useState } from "react";
import AssignedDeliveries from "./AssignedDeliveries";
import useAssignedDeliveries from "@/Core/Hooks/Delivery/useAssignedDeliveries.Hook";
import ToggleTabs from "@/Shared/Components/ToggleTabs.tsx/ToggleTabs";

export default function DeliveryHomepage() {
    const {
        assignedDeliveries,
        isLoading,
        error,
        currentPage,
        pageSize,
        totalCount,
        gotoNextPage,
        gotoPrevPage
    } = useAssignedDeliveries();

    const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

    const filterOptions = [
        { label: "All", value: "ALL" },
        { label: "Pending", value: "Waiting For Delivery" },
        { label: "On the Way", value: "On the Way" },
        { label: "Delivered", value: "Delivered" }
    ];

    const filteredDeliveries = assignedDeliveries.filter(item => {
        if (selectedStatus === "ALL") return true;
        return (item.status || "Waiting For Delivery") === selectedStatus;
    });

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-sm font-bold text-red-color tracking-wide uppercase">Driver Dashboard</h2>
                    <h1 className="text-3xl font-extrabold text-black-font">Assigned Deliveries</h1>
                </div>
                <ToggleTabs
                    options={filterOptions}
                    activeValue={selectedStatus}
                    onChange={(val) => setSelectedStatus(val)}
                />
            </div>

            <AssignedDeliveries
                items={filteredDeliveries}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                gotoNextPage={gotoNextPage}
                gotoPrevPage={gotoPrevPage}
            />
        </div>
    );
}
