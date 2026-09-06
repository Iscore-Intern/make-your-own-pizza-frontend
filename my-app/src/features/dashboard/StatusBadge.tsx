import { orderStatus } from "@/Core/Interfaces/ordersDashboard/orderStatus.types";

interface StatusBadgeProps {
    status: orderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    let colorClasses = "";
    switch (status) {
        case "Delivered":
            colorClasses = "bg-green-100 text-green-700 border-green-700";
            break;
        case "Preparing":
        case "Packing":
            colorClasses = "bg-orange-100 text-orange-700 border-orange-700";
            break;
        case "On the Way":
            colorClasses = "bg-red-100 text-red-700 border-red-700";
            break;
        case "Being assigned":
        case "Waiting for Delivery":
        default:
            colorClasses = "bg-gray-100 text-gray-700 border-gray-700";
            break;
    }

    return (
        <span className={`px-3 py-1 text-xs font-semibold border-2 rounded-full ${colorClasses}`}>
            {status}
        </span>
    );
}