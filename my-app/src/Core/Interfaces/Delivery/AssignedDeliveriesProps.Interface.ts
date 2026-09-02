import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";

export default interface AssignedDeliveriesProps {
    items: DeliveryDetails[];
    isLoading: boolean;
    page: number;
    pageSize: number;
    totalCount: number;
    gotoNextPage: () => void;
    gotoPrevPage: () => void;
}