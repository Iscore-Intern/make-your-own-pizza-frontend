import OrderTabs from "./OrderTabs";
import OrderCard from "./OrderCard";
import { Order } from "./Order";
//the main card
interface MyOrdersUIProps {
    orders: Order[];
    isLoading: boolean;
    isActive: boolean;
    handleChange: (value: boolean) => void;
}

export default function MyOrders({ orders, isLoading, isActive, handleChange}: MyOrdersUIProps) {
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-red-color mb-6">Orders</h2>
            <h4 className="text-2xl font-bold text-black-font mb-6">My Orders</h4>
            
            <OrderTabs isActive={isActive} onTabChange={handleChange} />
                    {isLoading ? (
                        <p className="text-center text-gray-500 mt-40 font-bold">Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-center text-gray-500 mt-40 font-bold">You Have Not Made Any Orders Yet</p>
                    ) : 
                    (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden divide-y divide-gray-100 p-4">
                            {orders.map((item) => (
                                <OrderCard 
                                    key={item.orderId}
                                    orderId={item.orderId}
                                    pizzaCount={item.pizzaCount}
                                    createdAt={item.createdAt}
                                    totalPrice={item.totalPrice}
                                    status={item.status}
                                />
                            ))}
                        </div>
                    </div>
                )}
        </div>
    )
}