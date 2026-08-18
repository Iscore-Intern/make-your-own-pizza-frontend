import axiosInstance from "@/Core/Interceptors/Authentication.Interceptor";

export default async function FetchUserProfile() {
    try {
        const response = await axiosInstance.get('/Auth/profile');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}