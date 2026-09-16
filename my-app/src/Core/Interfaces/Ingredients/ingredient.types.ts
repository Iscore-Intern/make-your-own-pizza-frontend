export interface Ingredient {
    id: string;
    name: string;
    price: number;
    colorHex: string;  
    isAvailable: boolean; 
    category: string;
}

export interface Pizza {
    id: string;
    name: string;
    price: number;
}

export interface MenuResponse {
    ingredients: Ingredient[];
    pizzas: Pizza[];
}

export type ingredientItem = Ingredient;