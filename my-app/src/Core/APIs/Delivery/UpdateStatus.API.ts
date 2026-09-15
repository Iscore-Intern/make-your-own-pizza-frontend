import DeliveryCardProps from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import toast from 'react-hot-toast';

export default async function UpdateDeliveryStatus(deliveryId: string, newStatus: string): Promise<DeliveryCardProps> {
    try {
        const response = await axiosInstance.put<DeliveryCardProps>(
            `/Delivery/${deliveryId}/status`,
            { status: newStatus }
        );
        return response.data;
    } catch (error) {
        toast.error("Error updating delivery status:");
        throw error;
    }
}