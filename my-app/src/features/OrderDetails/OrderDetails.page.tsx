import { useOrderDetails } from "./useOrderDetails";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

export default function OrderDetailsPage() {
    const { order, isLoading, error } = useOrderDetails();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white-color rounded-2xl border-2 border-black-font border-r-6 border-b-6 p-8 font-bold text-black-font text-lg">
                    Loading order details...
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white-color rounded-2xl border-2 border-black-font border-r-6 border-b-6 p-8 font-bold text-black-font text-lg text-center flex flex-col gap-4">
                    <p className="text-red-color">{error || "Order not found"}</p>
                    <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="px-4 py-2 bg-red-color text-white-color font-bold rounded-xl border-2 border-black-font hover:opacity-90"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <OrderDetails order={order} />
    );
}