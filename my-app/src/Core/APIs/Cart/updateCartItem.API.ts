import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import { AddCartIngredientItem } from "./addToCart.API";

export interface UpdateCartItemPayload {
    quantity: number;
    ingredients: AddCartIngredientItem[];
}

export const updateCartItemAPI = async (cartItemId: string, payload: UpdateCartItemPayload) => {
    const response = await axiosInstance.put(`/Cart/${cartItemId}`, payload);
    return response.data;
};
