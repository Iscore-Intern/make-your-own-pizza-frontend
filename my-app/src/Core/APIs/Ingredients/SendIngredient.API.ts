import { ingredientItem } from './../../Interfaces/Ingredients/ingredient.types';
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export interface CreateIngredientPayload {
    name: string;
    price: number;
    colorHex: string;
    category: number;
}

export const SendIngredient = async (newIngredientItem: CreateIngredientPayload | Omit<ingredientItem, "id">) => {
    const response = await axiosInstance.post<ingredientItem>("/Ingredients/add", newIngredientItem);
    return response.data;
};