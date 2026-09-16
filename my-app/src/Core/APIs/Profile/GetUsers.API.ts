import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import UserData from "@/Core/Interfaces/Profile/UserData.Interface";

export const getAllUsers = async () => {
    const response = await axiosInstance.get<UserData[]>("/User");
    return response.data;
};
