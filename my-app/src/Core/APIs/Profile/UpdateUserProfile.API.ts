import axiosInstance from "@/Core/Interceptors/Authentication.Interceptor";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";
import type UpdateProfileValues from "@/Core/Interfaces/Profile/UpdateProfileValues.Interface";
import toast from 'react-hot-toast';

export default async function UpdateUserProfile(updatedProfileData: UpdateProfileValues): Promise<UserData> {
    try {
        const response = await axiosInstance.put<UserData>(
            '/User/me',
            updatedProfileData);
            toast.success("Profile Updated Successfully!");
            return response.data;
    } catch (error) {
        toast.error("Error updating user profile.");
        throw error;
    }
}