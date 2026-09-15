import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const assignDriver = async (orderId:string ,driverId: string) => {
    const response = await axiosInstance.put(`api/Orders/${orderId}/${driverId}`, {
    });
    
    return response.data;
};