import { useParams, useNavigate } from "react-router-dom";
import useDeliveryDetails from "@/Core/Hooks/Delivery/useDeliveryDetails.Hook";
import DeliveryOrderDetails from "./DeliveryOrderDetails";

export default function DeliveryDetailsPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { delivery, isLoading, isUpdating, error, changeStatus } = useDeliveryDetails(orderId);

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto p-12 text-center">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-red-color rounded-full mb-4" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="text-gray-500 font-bold text-lg">Loading delivery details...</p>
            </div>
        );
    }

    if (error || !delivery) {
        return (
            <div className="max-w-3xl mx-auto p-12 text-center flex flex-col items-center gap-4">
                <p className="text-red-color font-bold text-xl">{error || "Delivery order not found."}</p>
                <button
                    type="button"
                    onClick={() => navigate('/delivery')}
                    className="px-5 py-2.5 rounded-xl bg-red-color text-white-color font-bold border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2 transition-all duration-200 cursor-pointer"
                >
                    Back to Deliveries
                </button>
            </div>
        );
    }

    return (
        <DeliveryOrderDetails
            order={delivery}
            isUpdating={isUpdating}
            onUpdateStatus={changeStatus}
        />
    );
}
