import { useNavigate } from "react-router-dom";
import { Order } from "./Order"; 
import { statusStyles } from "@/Shared/OrderStatus";

export default function OrderCard({ orderId, totalPrice, pizzaCount, createdAt, status }: Order) {
    const badgeStyle = statusStyles[status];
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center py-4 px-2">
                {/* letf */}
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-black-font">{orderId}</p>
                    <p className="text-xl font-bold text-fray-800">{pizzaCount}{pizzaCount > 1 ? " Pizzas" : " Pizza"}</p>
                    <p className="text-sm font-semibold text-sub-color">{createdAt}</p>
                </div>
                {/* middle */}
                <div className="flex items-center flex-col gap-2">
                    <p className="text-base font-bold text-gray-800">EGP {totalPrice}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${badgeStyle}`}>{status}</span>
                </div>
                {/* right */}
                <div className="flex items-center gap-3">
                    <button type="button" 
                    onClick={()=>{navigate(`/orders/${orderId}`)}}
                    className="w-full px-4 py-3 rounded-xl bg-red-color text-white-color border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200">
                    View Order</button>
                </div>
            </div>
        </div>
    );
}