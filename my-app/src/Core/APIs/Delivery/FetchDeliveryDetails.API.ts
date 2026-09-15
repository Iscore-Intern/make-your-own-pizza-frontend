import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import toast from 'react-hot-toast';

export default async function FetchDeliveryDetails(deliveryId: string): Promise<DeliveryDetails> {
    try {
        const response = await axiosInstance.get<DeliveryDetails>(`/Delivery/${deliveryId}`);
        return response.data;
    } catch (error) {
        toast.error("Error fetching delivery details.");
        throw error;
    }
}
