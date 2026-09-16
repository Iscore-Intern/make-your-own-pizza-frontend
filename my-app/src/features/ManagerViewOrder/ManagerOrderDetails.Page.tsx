import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useManagerOrderDetails from "@/Core/Hooks/managerOrderDetails/useManagerOrderDetails";
import CustomerInfoCard from "./CustomerInfoCard";
import OrderDetailsCard from "./OrderDetailsCard";
import AssignDeliveryCard from "./AssignDeliveryCard";
import UpdateStatusCard from "./UpdateStatusCard";
import BG from "../../../BG.jpg";

export default function ManagerOrderDetailsPage() {
    const navigate = useNavigate();
    const { orderId: paramOrderId } = useParams<{ orderId: string }>();
    const [searchParams] = useSearchParams();
    const queryOrderId = searchParams.get("orderId");

    // Default to route param, query param, or "123"
    const effectiveOrderId = paramOrderId || queryOrderId || "123";

    const {
        order,
        isLoadingOrders,
        getFormattedAddress,
        getFormattedPlacedAt,
        drivers,
        isLoadingDrivers,
        selectedDriverId,
        setSelectedDriverId,
        isAssigningDriver,
        handleAssignDriver,
        Statuses,
        selectedStatus,
        setSelectedStatus,
        isSaving,
        handleSaveChanges,
    } = useManagerOrderDetails(effectiveOrderId);

    if (isLoadingOrders && !order) {
        return (
            <div
                className="w-full min-h-screen flex items-center justify-center p-4"
                style={{ backgroundImage: `url(${BG})` }}
            >
                <div className="bg-white-color rounded-2xl border-2 border-black-font border-r-6 border-b-6 p-8 font-bold text-black-font text-lg">
                    Loading order details...
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div
                className="w-full min-h-screen flex items-center justify-center p-4"
                style={{ backgroundImage: `url(${BG})` }}
            >
                <div className="bg-white-color rounded-2xl border-2 border-black-font border-r-6 border-b-6 p-8 font-bold text-black-font text-lg text-center flex flex-col gap-4">
                    <p>Order not found</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="px-4 py-2 bg-red-color text-white font-bold rounded-xl border-2 border-black-font"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const customerFullName = order.customer?.name || "Customer";

    return (
        <div
            className="w-full min-h-screen py-10 px-4 sm:px-6"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                {/* Top Bar with Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 px-4 py-2 bg-white-color text-black-font font-bold rounded-xl border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm cursor-pointer"
                    >
                        <span>←</span> Back to Dashboard
                    </button>
                    <span className="font-bold text-sub-color text-sm uppercase tracking-widest">
                        Order #{order.orderId}
                    </span>
                </div>

                {/* 1. Customer Card */}
                <CustomerInfoCard
                    customerName={customerFullName}
                    customerPhone={order.customer?.phone || ""}
                    customerAddress={getFormattedAddress()}
                    placedAt={getFormattedPlacedAt()}
                />

                {/* 2. Items Card */}
                <OrderDetailsCard
                    items={order.items}
                    totalPrice={order.totalPrice}
                />

                {/* 3. Assign Delivery Card */}
                <AssignDeliveryCard
                    drivers={drivers}
                    isLoadingDrivers={isLoadingDrivers}
                    selectedDriverId={selectedDriverId}
                    isAssigningDriver={isAssigningDriver}
                    onSelectDriver={(driverId) => setSelectedDriverId(driverId || null)}
                    onAssignDriver={handleAssignDriver}
                />

                {/* 5. Update Status Card */}
                <UpdateStatusCard
                    statuses={Statuses}
                    selectedStatus={selectedStatus}
                    currentStatus={order.status}
                    isSaving={isSaving}
                    onSelectStatus={(status) => setSelectedStatus(status)}
                    onSaveChanges={handleSaveChanges}
                />
            </div>
        </div>
    );
}