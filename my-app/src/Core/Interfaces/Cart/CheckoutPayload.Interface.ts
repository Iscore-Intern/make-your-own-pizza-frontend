import CartItem from "./CartItem.Interface";
import AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";

export interface CustomerContact {
    name: string;
    phone: string;
    email?: string;
}

export interface CheckoutPayload {
    items: CartItem[];
    customer?: CustomerContact;
    deliveryAddress?: AddressValues & { formatted?: string };
    paymentMethod: number; // 0: Cash on Delivery
    totalPrice: number;
}

export default CheckoutPayload;
