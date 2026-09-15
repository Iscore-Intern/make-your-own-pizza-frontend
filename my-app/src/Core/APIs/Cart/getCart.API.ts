import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";

export const getCart = async () => {
    const response = await axiosInstance.get<CartItem[]>("api/Cart");
    return response.data;
};
