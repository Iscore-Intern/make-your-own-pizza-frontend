export interface CartItem {
    id: string;
    name: string;
    size: string;
    description: string;
    price: number;
    quantity: number;
    image?: string;
}

export default CartItem;
