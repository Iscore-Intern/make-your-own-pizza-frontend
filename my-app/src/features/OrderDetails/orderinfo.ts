export interface Ingredient {
    ingredientId: string;
    ingredientName: string;
    quantity: number;
}

export interface PizzaItem {
    pizzaId: string;
    pizzaName: string;
    price: number;
    ingredients: Ingredient[];
}

export interface OrderDetailsData {
    orderId: string;
    totalPrice: number;
    paymentMethod: number; 
    customerPhone: string;
    status: "On the Way" | "Delivered" | "Waiting For Delivery" | "Cancelled"; 
    pizzas: PizzaItem[];
    createdAt:string;
}