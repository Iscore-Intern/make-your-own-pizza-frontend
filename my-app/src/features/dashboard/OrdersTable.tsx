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
    return(
        <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-black">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black text-gray-400 text-xs uppercase tracking-widest bg-gray-50">
                        <th className="p-5 font-semibold">Order</th>
                        <th className="p-5 font-semibold">Customer</th>
                        <th className="p-5 font-semibold">Items</th>
                        <th className="p-5 font-semibold">Total</th>
                        <th className="p-5 font-semibold">Status</th>
                        <th className="p-5 font-semibold"></th> 
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr 
                            key={order.id} 
                            className="border-b-2 border-gray-100 hover:bg-orange-50 transition-colors last:border-b-0"
                        >
                            <td className="p-5 font-black text-lg">#{order.id}</td>
                            <td className="p-5 font-semibold">{order.customerName}</td>
                            <td className="p-5 text-gray-500 font-medium">{order.itemsCount} pizza(s)</td>
                            <td className="p-5 font-semibold">EGP {order.totalPrice}</td>
                            <td className="p-5">
                                <StatusBadge status={order.status} />
                            </td>
                            <td className="p-5 text-right">
                                <button className="px-5 py-2 border-2 border-black rounded-xl font-bold text-sm hover:bg-black hover:text-white transition-all">
                                    View Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}