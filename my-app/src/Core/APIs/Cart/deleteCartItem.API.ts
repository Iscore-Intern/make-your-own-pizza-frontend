import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const deleteCartItemAPI = async (cartItemId: string) => {
    const response = await axiosInstance.delete(`/Cart/${cartItemId}`);
    return response.data;
};
