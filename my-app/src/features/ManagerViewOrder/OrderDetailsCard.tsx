import { PizzaItem } from "../OrderDetails/orderinfo";


interface OrderDetailsCardProps{
    pizzas: PizzaItem[];
    totalPrice:number;
}

export default function OrderDetailsCard({ pizzas, totalPrice }: OrderDetailsCardProps) {
    if (!pizzas || pizzas.length === 0) return null;
    
}