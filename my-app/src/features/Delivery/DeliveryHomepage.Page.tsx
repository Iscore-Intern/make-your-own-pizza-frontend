import AssignedDeliveries from "./AssignedDeliveries";



export default function DeliveryHomepage() {
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-red-color mb-6">Deliveries</h2>
            <h4 className="text-2xl font-bold text-black-font mb-6">Assigned Deliveries</h4>

            <AssignedDeliveries />
        </div>
    );
}