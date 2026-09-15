import DeliveryListResponse from "@/Core/Interfaces/Delivery/DeliveryListResponse.Interface";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import toast from 'react-hot-toast';

export default async function FetchAssignedDeliveries(page: number, pageSize: number): Promise<DeliveryListResponse> {
    try {
        const response = await axiosInstance.get<DeliveryListResponse>('/Delivery/assigned', {params: {page, pageSize}});
        return response.data;
    } catch (error) {
        toast.error("Error fetching assigned deliveries.");
        throw error;
    }
}