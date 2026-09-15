import CartItem from "./CartItem.Interface";

export interface CheckoutPayload {
    items: CartItem[];
    specialRequest?: string;
    paymentMethod: number; // 0: Cash on Delivery, 1: Visa
    totalPrice: number;
}

export default CheckoutPayload;
