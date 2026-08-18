import axiosInstance from "@/Core/Interceptors/Authentication.Interceptor";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";

export default async function FetchUserProfile() : Promise<UserData> {
    try {
        const response = await axiosInstance.get('/Auth/profile');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}