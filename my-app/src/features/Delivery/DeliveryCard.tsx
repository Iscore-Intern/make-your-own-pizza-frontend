import { useNavigate } from "react-router-dom";
import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";




export default function DeliveryCard( DeliveryDetails : DeliveryDetails ) {
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center py-4 px-2">
                {/* letf */}
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold text-black-font">Order #{DeliveryDetails.OrderId}</p>
                    <p className="text-base font-semibold text-black-font">{DeliveryDetails.CustomerName}</p>
                    <p className="text-base font-semibold text-black-font">{DeliveryDetails.CustomerAddress}</p>
                    <p className="text-base font-semibold text-black-font">{DeliveryDetails.CustomerPhone}</p>
                    <p className="text-xs font-medium text-sub-color">{DeliveryDetails.OrderCreationTime}</p>
                </div>
                {/* middle */}
                <div className="flex items-center flex-col gap-2">
                    <p className="text-xl font-bold text-gray-800">{DeliveryDetails.PizzaCount}{DeliveryDetails.PizzaCount > 1 ? " Pizzas" : " Pizza"}</p>
                    <p className="text-base font-bold text-gray-800">EGP {DeliveryDetails.TotalPrice}</p>
                </div>
                {/* right */}
                <div className="flex items-center gap-3">
                    <button type="button"
                    onClick={()=>{navigate(`/orders/${DeliveryDetails.OrderId}`)}}
                    className="w-full px-4 py-3 rounded-xl bg-red-color text-white-color border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200">
                    View Order</button>
                </div>
            </div>
        </div>
    );
}