import { OrderDetailsData } from "./orderinfo";
import { statusStyles } from "@/Shared/OrderStatus";

interface OrderDetailsProps{
    order:OrderDetailsData
}

export default function OrderDetails({order}:OrderDetailsProps){
    const badgeStyle = statusStyles[order.status];
    const paymentMethodMap: Record<number, string> = {
    0: "Cash on Delivery",
    2: "Visa",
    };  
    return(
        <div className="max-w-3xl mx-auto mt-24 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-red-color mb-2">Order Details</h2>
            <div>
            <h4 className="text-2xl font-bold text-black-font mb-6">Order #{order.orderId}</h4>
            <span className={`text-lg font-medium px-2 py-1 rounded-md ${badgeStyle}`}>{order.status}</span>
            </div>
            <div className="bg-white rounded-3xl border border-black-font shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-r-8 border-b-8 border-l-2 border-t-2 overflow-hidden divide-y divide-gray-100 p-8 flex flex-col gap-6">
                {/* pizza details Section */}
                <div >
                    <h3 className="text-s font-bold text-sub-color mb-4">YOUR PIZZAS</h3>
                    <div className="flex flex-col gap-4">
                        {order.pizzas.map((pizza) => (
                            <div key={pizza.pizzaId} className="flex flex-col gap-1">
                                <p className="font-bold text-black-font">
                                    {pizza.pizzaName}
                                </p>
                                <p className="text-sm text-sub-color mt-1 mb-1">
                                    {pizza.ingredients.map((ing) => ing.ingredientName).join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Delivery section */}
                <div>
                    <h3 className="text-s font-bold text-sub-color mb-4">DELIVERY TO</h3>
                    <p className="font-bold text-black-font">Customer Phone</p>
                    <p className="text-sm text-sub-color mt-1 mb-1">{order.customerPhone}</p>
                </div>
                {/* Payment & Date */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-s font-bold text-sub-color mb-4">PAYMENT</h3>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-black-font text-s">Method</span>
                        <span className="font-semibold text-sub-color">
                            {paymentMethodMap[order.paymentMethod] ?? "Unknown"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-bold text-black-font text-s">Order date</span>
                        <span className="font-semibold text-sub-color text-xs">
                            {new Date(order.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
                {/* price */}
                <div className="flex justify-between items-center pt-1">
                    <span className="text-s font-bold text-sub-color mb-4">TOTAL</span>
                    <span className="text-lg font-bold text-black-font">
                        EGP <span className="text-lg font-bold">{order.totalPrice}</span>
                    </span>
                </div>

            </div>

        </div>
    )
}