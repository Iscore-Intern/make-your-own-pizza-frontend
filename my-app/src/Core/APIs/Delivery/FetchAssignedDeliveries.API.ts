import DeliveryCardProps from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import toast from 'react-hot-toast';

export default async function FetchAssignedDeliveries(): Promise<DeliveryCardProps[]> {
    try {
        const response = await axiosInstance.get<DeliveryCardProps[]>('/Delivery/assigned');
        return response.data;
    } catch (error) {
        toast.error("Error fetching assigned deliveries.");
        throw error;
    }
}