import DeliveryCard from "@/features/Delivery/DeliveryCard";
import Pagination from "@/Shared/Components/Pagination/Pagination";
import AssignedDeliveriesProps from "@/Core/Interfaces/Delivery/AssignedDeliveriesProps.Interface";


export default function AssignedDeliveries({
    items, isLoading, error,
    currentPage, pageSize, totalCount,
    gotoNextPage, gotoPrevPage,
}: AssignedDeliveriesProps) {

    return (
        <>
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden divide-y divide-gray-100 p-4">

                {isLoading && (
                    <p className="py-6 text-center text-sub-color">Loading deliveries...</p>
                )}

                {!isLoading && error && (
                    <p className="py-6 text-center text-red-color">{error}</p>
                )}

                {!isLoading && !error && items.length === 0 && (
                    <p className="py-6 text-center text-sub-color">No assigned deliveries.</p>
                )}

                {!isLoading && !error && items.map((order) => (
                    <DeliveryCard key={order.OrderId} {...order} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                gotoNextPage={gotoNextPage}
                gotoPrevPage={gotoPrevPage}
            />
        </>
    );
}
