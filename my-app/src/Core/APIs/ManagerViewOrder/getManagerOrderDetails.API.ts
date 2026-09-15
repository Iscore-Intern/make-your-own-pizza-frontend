import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import ManagerViewOrder from "@/Core/Interfaces/ManagerViewOrder/ManagerViewOrder.Interface";

export const getManagerOrderDetails = async (orderId: string) => {
    const response = await axiosInstance.get<ManagerViewOrder>(`api/Orders/${orderId}`);
    return response.data;
};