export type OrderStatus = "On the Way" | "Delivered" | "Waiting For Delivery" | "Cancelled";

export interface CustomerInfo {
    name: string;
    phone: string;
    email?: string;
}

export interface DeliveryAddress {
    street?: string;
    district?: string;
    city?: string;
    floor?: string;
    apartment?: string;
    formatted: string;
}

export interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    toppings?: string[];
}

export default interface ManagerViewOrder {
    orderId: string;
    status: OrderStatus;
    createdAt: string;
    note?: string;
    paymentMethod: number; // 0: Cash on Delivery, 1: Visa
    totalPrice: number;
    customer: CustomerInfo;
    deliveryAddress: DeliveryAddress;
    items: OrderItem[];
}