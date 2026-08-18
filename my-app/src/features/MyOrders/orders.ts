export interface Order {
    orderId: string;
    totalPrice: number;
    pizzaCount: number;
    createdAt: string;
    status: "On the Way" | "Delivered" | "Waiting For Delivery" | "Cancelled";
}

export interface orderTabsProps {
    isActive: boolean;
    onTabChange: (isActive: boolean) => void;
}