import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import { MenuResponse, Ingredient } from "@/Core/Interfaces/Ingredients/ingredient.types";

export const GetIngredients = async (): Promise<MenuResponse> => {
    const response = await axiosInstance.get<MenuResponse | Ingredient[]>("/Ingredients");

    if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) {
        return {
            ingredients: Array.isArray(response.data.ingredients) ? response.data.ingredients : [],
            pizzas: Array.isArray(response.data.pizzas) ? response.data.pizzas : [],
        };
    }

    if (Array.isArray(response.data)) {
        return {
            ingredients: response.data,
            pizzas: [],
        };
    }

    return {
        ingredients: [],
        pizzas: [],
    };
};