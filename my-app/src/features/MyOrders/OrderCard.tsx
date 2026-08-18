import { Order } from "./orders"; 
import cancelled from "../../../src/assets/cancelled.svg";
import delivered from "../../../src/assets/delivered.svg";
import onTheWay from "../../../src/assets/onTheWay.svg";
import waitingForDeli from "../../../src/assets/waitingForDeli.svg";

const statusAnimation = {
    'On the Way': onTheWay,
    'Waiting For Delivery': waitingForDeli,
    'Cancelled': cancelled,
    'Delivered': delivered,
};

export default function OrderCard({ orderId, totalPrice, pizzaCount, createdAt, status }: Order) {
    const currentAnimation = statusAnimation[status];
    return (
        <div className="w-full">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col gap-5">
                    <p className="text-xs font-semibold text-gray-600">{orderId}</p>
                    <p className="text-lg font-bold text-fray-800">{pizzaCount}{pizzaCount > 1 ? " Pizzas" : " Pizza"}</p>
                    <p className="text-sm font-semibold text-gray-600">{createdAt}</p>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <p className="text-base font-bold text-gray-800">EGP {totalPrice}</p>
                    <img src={currentAnimation} alt={`${status} icon`} className="w-18 h-18 object-contain" />
                    <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{status}</span>
                </div>
                <div className="flex">
                    <button type="button" className="px-5 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-colors">View Order</button>
                </div>
            </div>
        </div>
    );
}