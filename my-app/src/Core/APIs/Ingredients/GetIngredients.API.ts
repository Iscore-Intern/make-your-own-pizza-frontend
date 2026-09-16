import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";

export const GetIngredients = async () => {
    const response = await axiosInstance.get<ingredientItem[]>("/Ingredients");
    return response.data;
};