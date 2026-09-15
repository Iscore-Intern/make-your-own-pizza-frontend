import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import { statusStyles } from "@/Shared/OrderStatus";
import { useNavigate } from "react-router-dom";

interface DeliveryOrderDetailsProps {
    order: DeliveryDetails;
    isUpdating: boolean;
    onUpdateStatus: (newStatus: string) => void;
}

export default function DeliveryOrderDetails({
    order,
    isUpdating,
    onUpdateStatus
}: DeliveryOrderDetailsProps) {
    const navigate = useNavigate();
    const currentStatus = order.status || 'Waiting For Delivery';
    const badgeStyle = statusStyles[currentStatus as keyof typeof statusStyles] || 'bg-gray-100 text-gray-700 border-gray-300';

    const paymentMethodText = typeof order.paymentMethod === 'number'
        ? (order.paymentMethod === 0 ? "Cash on Delivery" : "Visa / Online")
        : (order.paymentMethod || "Cash on Delivery");

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => navigate('/delivery')}
                    className="px-4 py-2 rounded-xl bg-beige-color text-black-font font-bold text-sm border-2 border-black-font border-r-4 border-b-4 hover:bg-beige-dark transition-all duration-200 cursor-pointer flex items-center gap-2 w-fit"
                >
                    <span className="text-lg">&larr;</span> Back to Deliveries
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-sub-color">Status:</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${badgeStyle}`}>
                        {currentStatus}
                    </span>
                </div>
            </div>

            <div>
                <h2 className="text-xs font-bold text-red-color tracking-wider uppercase mb-1">Delivery Order Details</h2>
                <h1 className="text-3xl font-extrabold text-black-font">Order #{order.OrderId}</h1>
            </div>

            <div className="bg-white rounded-3xl border border-black-font shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-r-8 border-b-8 overflow-hidden divide-y divide-gray-100 p-6 md:p-8 flex flex-col gap-6">

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold text-black-font">Update Order Status</p>
                        <p className="text-xs text-sub-color">Advance order through delivery pipeline</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {currentStatus === 'Waiting For Delivery' && (
                            <>
                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => onUpdateStatus('On the Way')}
                                    className="px-5 py-2.5 rounded-xl bg-red-color text-white-color font-bold text-sm border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:transform-none"
                                >
                                    {isUpdating ? 'Updating...' : 'Start Delivery (On the Way)'}
                                </button>
                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => onUpdateStatus('Cancelled')}
                                    className="px-4 py-2.5 rounded-xl bg-beige-dark text-black-font font-bold text-sm border-2 border-black-font border-r-4 border-b-4 hover:bg-beige-color transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:transform-none"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {currentStatus === 'On the Way' && (
                            <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => onUpdateStatus('Delivered')}
                                className="px-5 py-2.5 rounded-xl bg-red-color text-white-color font-bold text-sm border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:transform-none"
                            >
                                {isUpdating ? 'Updating...' : 'Mark as Delivered'}
                            </button>
                        )}

                        {currentStatus === 'Delivered' && (
                            <span className="text-sm font-bold text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
                                Delivery Completed
                            </span>
                        )}

                        {currentStatus === 'Cancelled' && (
                            <span className="text-sm font-bold text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">
                                Delivery Cancelled
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-sub-color tracking-wider uppercase mb-3">Customer & Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-red-50/30 p-4 rounded-2xl border border-red-100">
                        <div>
                            <p className="text-xs text-sub-color">Customer Name</p>
                            <p className="text-base font-bold text-black-font mt-0.5">{order.CustomerName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-sub-color">Phone Number</p>
                            <p className="text-base font-bold text-black-font mt-0.5">{order.CustomerPhone}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-xs text-sub-color">Delivery Address</p>
                            <p className="text-base font-semibold text-black-font mt-0.5">{order.CustomerAddress}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-sub-color tracking-wider uppercase mb-3">Order Items</h3>
                    {order.pizzas && order.pizzas.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {order.pizzas.map((pizza) => (
                                <div key={pizza.pizzaId} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-black-font text-base">{pizza.pizzaName}</p>
                                        <p className="text-xs text-sub-color mt-1">
                                            {pizza.ingredients?.map(ing => ing.ingredientName).join(', ')}
                                        </p>
                                    </div>
                                    <p className="font-bold text-black-font">EGP {pizza.price}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                            <p className="font-semibold text-black-font">{order.PizzaCount} {order.PizzaCount === 1 ? "Pizza" : "Pizzas"}</p>
                            <p className="text-sm font-medium text-sub-color">Custom Selection</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-sub-color tracking-wider uppercase mb-1">Payment & Info</h3>
                    <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-sub-color text-sm">Payment Method</span>
                        <span className="font-bold text-black-font text-sm">{paymentMethodText}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-sub-color text-sm">Order Created At</span>
                        <span className="font-medium text-gray-600 text-xs">
                            {order.OrderCreationTime ? new Date(order.OrderCreationTime).toLocaleString() : 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-base font-bold text-black-font">TOTAL AMOUNT</span>
                        <span className="text-xl font-extrabold text-red-color">
                            EGP {order.TotalPrice}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
