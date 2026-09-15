import useManagerOrderDetails from "@/Core/Hooks/managerOrderDetails/useManagerOrderDetails";
import CustomerInfoCard from "./CustomerInfoCard";

export default function ManagerOrderDetailsPage() {
    const { order, getFormattedAddress } = useManagerOrderDetails("123");
    if (!order) return <div>Loading test...</div>;
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <CustomerInfoCard 
                customerName={`${order.customerData.firstName} ${order.customerData.lastName}`}
                customerPhone={order.customerPhone}
                customerAddress={getFormattedAddress()} 
                placedAt={order.createdAt} 
            />
        </div>
    );
}