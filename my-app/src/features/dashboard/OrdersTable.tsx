import { orderShape } from "@/Core/Interfaces/ordersDashboard/orderShape";
import { statusStyles } from "@/Shared/OrderStatus";
interface OrdersTableProps{
    orders: orderShape[];
}

export default function OrdersTable({orders}:OrdersTableProps){
    if (orders.length === 0) {
        return (
            <div className="w-full p-8 text-center">
                <p className="text-sub-color font-bold text-lg">No orders found.</p>
            </div>
        );
    }
    return(
        <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-black-font">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black text-sub-color text-xs uppercase tracking-widest">
                        <th className="p-5 font-bold">Order</th>
                        <th className="p-5 font-bold">Customer</th>
                        <th className="p-5 font-bold">Items</th>
                        <th className="p-5 font-bold">Total</th>
                        <th className="p-5 font-bold">Status</th>
                        <th className="p-5 font-bold"></th> 
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr 
                            key={order.id} 
                            className="border-b-2 border-gray-100 last:border-b-0"
                        >
                            <td className="p-5 text-black-font font-bold text-lg">#{order.id}</td>
                            <td className="p-5 font-semibold">{order.customerName}</td>
                            <td className="p-5 text-sub-color font-medium">{order.itemsCount} pizza(s)</td>
                            <td className="p-5 font-semibold">EGP {order.totalPrice}</td>
                            <td className="p-5">
                                <span className={`px-3 py-1 text-xs font-bold border-2 rounded-xl ${
                                    statusStyles[order.status as keyof typeof statusStyles] || 'bg-gray-50 text-gray-600 border-gray-200'
                                }`}>{order.status}</span>
                            </td>
                            <td className="p-5 text-right">
                                <button className="px-4 py-3 rounded-xl bg-red-color text-white-color border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200">
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