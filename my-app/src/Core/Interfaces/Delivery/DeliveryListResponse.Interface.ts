import DeliveryDetails from '@/Core/Interfaces/Delivery/DeliveryDetails.Interface';


export default interface DeliveryListResponse {
    items: DeliveryDetails[];
    totalCount: number;
}