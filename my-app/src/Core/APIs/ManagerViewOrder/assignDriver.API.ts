import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const assignDriver = async (orderId: string, driverId: string) => {
    const response = await axiosInstance.put(`/Order/${orderId}/${driverId}`, {});
    return response.data;
};