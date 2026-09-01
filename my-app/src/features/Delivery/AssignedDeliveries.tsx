import OrderCard from "./DeliveryCard";

export default function AssignedDeliveries() {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden divide-y divide-gray-100 p-4">
            <OrderCard
                    CustomerName="John Doe"
                    CustomerPhone="123-456-7890"
                    CustomerAddress="123 Main St, Anytown, USA"
                    OrderId="12345"
                    OrderTime="2:00 PM"
                    OrderCreationTime="1:00 PM"
                    PizzaCount={2}
                    TotalPrice={25.99}
                />
        </div>
    );
}