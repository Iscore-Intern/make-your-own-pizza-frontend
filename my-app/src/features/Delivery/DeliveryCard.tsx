import { useNavigate } from "react-router-dom";
import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import { statusStyles } from "@/Shared/OrderStatus";

export default function DeliveryCard(order: DeliveryDetails) {
    const {
        OrderId,
        CustomerName,
        CustomerAddress,
        CustomerPhone,
        OrderCreationTime,
        PizzaCount,
        TotalPrice,
        status = 'Waiting For Delivery'
    } = order;

    const navigate = useNavigate();
    const badgeStyle = statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-700 border-gray-300';

    return (
        <div className="p-5 hover:bg-gray-50/80 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-black-font">Order #{OrderId}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-base font-semibold text-black-font">{CustomerName}</p>
                    <p className="text-sm text-sub-color">
                        {CustomerAddress}
                    </p>
                    <p className="text-sm text-sub-color">
                        {CustomerPhone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {OrderCreationTime ? new Date(OrderCreationTime).toLocaleString() : ''}
                    </p>
                </div>

                <div className="flex items-baseline md:flex-col md:items-end gap-2 md:gap-1">
                    <p className="text-sm font-semibold text-gray-700">
                        {PizzaCount} {PizzaCount === 1 ? "Pizza" : "Pizzas"}
                    </p>
                    <p className="text-lg font-bold text-black-font">
                        EGP {TotalPrice}
                    </p>
                </div>

                <div className="w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => navigate(`/delivery/${OrderId}`)}
                        className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-color text-white-color font-bold border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200 cursor-pointer"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}