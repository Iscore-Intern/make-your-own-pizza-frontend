import StatusBadge from "./StatusBadge";
import { orderShape } from "@/Core/Interfaces/ordersDashboard/orderShape";

interface OrdersTableProps{
    orders: orderShape[];
}

export default function OrdersTable({orders}:OrdersTableProps){
    if (orders.length === 0) {
        return (
            <div className="w-full p-8 text-center bg-white">
                <p className="text-gray-500 font-bold text-lg">No orders found.</p>
            </div>
        );
    }
}