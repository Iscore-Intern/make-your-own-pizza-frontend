import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import Driver from "@/Core/Interfaces/ManagerViewOrder/Driver.Interface";
export const getDriversList = async () => {
    const response = await axiosInstance.get<Driver[]>("/Drivers");
    return response.data;
};