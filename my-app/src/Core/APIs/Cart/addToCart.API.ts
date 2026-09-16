import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export interface AddCartIngredientItem {
    ingredientId: string;
    quantity: number;
}

export interface AddToCartPayload {
    pizzaId: string;
    quantity: number;
    ingredients: AddCartIngredientItem[];
}

export const addToCartAPI = async (payload: AddToCartPayload) => {
    const response = await axiosInstance.post("/Cart", payload);
    return response.data;
};
