import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";

export type PizzaSize = "Small" | "Medium" | "Large";

export interface SizeOption {
    size: PizzaSize;
    label: string;
    inches: number;
    basePrice: number;
    scale: number;
}

export interface CustomPizzaConfig {
    size: PizzaSize;
    ingredients: ingredientItem[];
    basePrice: number;
    toppingsPrice: number;
    totalPrice: number;
    quantity: number;
}
