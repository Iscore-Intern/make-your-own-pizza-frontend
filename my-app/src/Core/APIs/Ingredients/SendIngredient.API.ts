import { ingredientItem } from './../../Interfaces/Ingredients/ingredient.types';
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const SendIngredient=async(newIngredientItem: Omit<ingredientItem, "id">)=>{
    const response = await axiosInstance.post<ingredientItem>("ma7shybetengan", newIngredientItem);
    return response.data;
}