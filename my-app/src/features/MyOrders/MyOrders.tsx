import OrderTabs from "./OrderTabs";
import OrderCard from "./OrderCard";
import { Order } from "./orders";

interface MyOrdersUIProps {
    orders: Order[];
    isLoading: boolean;
    isActive: boolean;
    handleChange: (value: boolean) => void;
}

export default function MyOrders({ orders, isLoading, isActive, handleChange }: MyOrdersUIProps) {
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4" style={{ marginTop: "100px" }}>
            <h2 style={{ color: "#E65F10", fontWeight: "bold", fontSize: "18px" }}>Orders</h2>
            <h4 style={{ color: "#070707", fontWeight: "bold", fontSize: "30px" }}>My Orders</h4>
            
            <OrderTabs isActive={isActive} onTabChange={handleChange} />
            
            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <p className="text-center text-gray-500 mt-40 font-bold">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-500 mt-40 font-bold">You Have Not Made Any Orders Yet</p>
                ) : (
                    orders.map((item) => (
                        <OrderCard 
                            key={item.orderId}
                            orderId={item.orderId}
                            pizzaCount={item.pizzaCount}
                            createdAt={item.createdAt}
                            totalPrice={item.totalPrice}
                            status={item.status}
                        />
                    ))
                )}
            </div>
        </div>
    );
}