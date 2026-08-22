import { Order } from "./Order"; 
// import cancelled from "../../../src/assets/cancelled.svg";
// import delivered from "../../../src/assets/delivered.svg";
// import onTheWay from "../../../src/assets/onTheWay.svg";
// import waitingForDeli from "../../../src/assets/waitingForDeli.svg";
//individual row
// const statusAnimation = {
//     'On the Way': onTheWay,
//     'Waiting For Delivery': waitingForDeli,
//     'Cancelled': cancelled,
//     'Delivered': delivered,
// };
const statusStyles={
    'On the Way': 'bg-blue-50 text-blue-600 border-blue-200',
    'Delivered': 'bg-green-50 text-green-600 border-green-200',
    'Waiting For Delivery': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Cancelled': 'bg-red-50 text-red-600 border-red-200',
}

export default function OrderCard({ orderId, totalPrice, pizzaCount, createdAt, status }: Order) {
    // const currentAnimation = statusAnimation[status];
    const badgeStyle = statusStyles[status];
    return (
        <div>
            <div className="flex justify-between items-center py-4 px-2">
                {/* letf */}
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-black-font">{orderId}</p>
                    <p className="text-xl font-bold text-fray-800">{pizzaCount}{pizzaCount > 1 ? " Pizzas" : " Pizza"}</p>
                    <p className="text-sm font-semibold text-sub-color">{createdAt}</p>
                </div>
                {/* middle left */}
                <div className="flex items-center flex-col gap-2">
                    <p className="text-base font-bold text-gray-800">EGP {totalPrice}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${badgeStyle}`}>{status}</span>
                </div>
                {/* middle right
                <div className="flex items-center">
                    <img src={currentAnimation} alt={`${status} icon`} className="w-18 h-18 " />
                </div> */}
                {/* right */}
                <div className="flex items-center gap-3">
                    <button type="button" 
                    className="w-full px-4 py-3 rounded-xl bg-beige-color text-black-font border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200">
                    View Order</button>
                </div>
            </div>
        </div>
    );
}