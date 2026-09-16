import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import { orderShape } from "@/Core/Interfaces/ordersDashboard/orderShape";

export const getOrders = async () => {
    const response = await axiosInstance.get<orderShape[]>("/Order");
    return response.data;
};