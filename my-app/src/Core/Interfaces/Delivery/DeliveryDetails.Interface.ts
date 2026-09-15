export interface PizzaIngredient {
    ingredientId: string;
    ingredientName: string;
    quantity: number;
}

export interface DeliveryPizzaItem {
    pizzaId: string;
    pizzaName: string;
    price: number;
    ingredients: PizzaIngredient[];
}

export default interface DeliveryDetails {
    CustomerName: string;
    CustomerPhone: string;
    CustomerAddress: string;
    OrderId: string;
    OrderTime?: string;
    OrderCreationTime: string;
    PizzaCount: number;
    TotalPrice: number;
    status?: string;
    paymentMethod?: number | string;
    pizzas?: DeliveryPizzaItem[];
    notes?: string;
}