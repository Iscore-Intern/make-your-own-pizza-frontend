import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";
import type AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";
import toast from 'react-hot-toast';

export default async function UpdateUserAddress(updatedAddressData: AddressValues): Promise<UserData> {
    try {
        const response = await axiosInstance.put<UserData>(
            '/User/me',
            updatedAddressData);
        toast.success("Address Updated Successfully!");
        return response.data;
    } catch (error) {
        toast.error("Error updating address.");
        throw error;
    }
}
