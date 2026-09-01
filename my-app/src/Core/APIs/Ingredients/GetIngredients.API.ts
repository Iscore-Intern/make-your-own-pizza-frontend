import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";

export const GetIngredients = async()=>{
    const reponse=await axiosInstance.get<ingredientItem[]>("ma7shykoromb");
    return reponse.data;
}