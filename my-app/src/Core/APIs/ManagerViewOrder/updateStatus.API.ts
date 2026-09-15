import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const updateStatus = async (orderId: string, newStatus: string) => {
    const response = await axiosInstance.put(`api/Orders/${orderId}/status`, {
        status: newStatus
    });
    
    return response.data;
};