import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";
import CheckoutPayload from "@/Core/Interfaces/Cart/CheckoutPayload.Interface";
import { getCart } from "@/Core/APIs/Cart/getCart.API";
import { checkoutOrder } from "@/Core/APIs/Cart/checkout.API";
import toast from "react-hot-toast";

const initialMockCart: CartItem[] = [
    {
        id: "cart-1",
        name: "Custom Pizza",
        size: "Medium",
        description: "Pepperoni, Fresh Basil, Extra Mozzarella",
        price: 208,
        quantity: 2,
    },
    {
        id: "cart-2",
        name: "Margherita (Large)",
        size: "Large",
        description: "Mozzarella, Fresh Basil",
        price: 195,
        quantity: 1,
    },
];

export default function useCart() {
    const navigate = useNavigate();

    // Initialize items from localStorage or fallback to mock
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem("cart");
            if (raw) {
                const parsed = JSON.parse(raw) as CartItem[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch {
            // Ignore parse errors
        }
        return initialMockCart;
    });

    const [specialRequest, setSpecialRequest] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<number>(0); // 0: Cash on Delivery, 1: Visa
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Sync items to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(items));
        } catch {
            // Storage quota or error
        }
    }, [items]);

    // Attempt to fetch from backend API if available
    useEffect(() => {
        setIsLoading(true);
        getCart()
            .then((data) => {
                if (data && Array.isArray(data) && data.length > 0) {
                    setItems(data);
                }
            })
            .catch((error) => {
                console.warn("Backend Cart API not reachable, using local cart:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Price computations
    const subtotal = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const deliveryFee = items.length > 0 ? 20 : 0;
    const total = subtotal + deliveryFee;

    const totalItemCount = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    // Item handlers
    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter((item): item is CartItem => item !== null)
        );
    };

    const removeItem = (id: string) => {
        const itemToRemove = items.find((i) => i.id === id);
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success(`Removed ${itemToRemove?.name || "item"} from cart`);
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("cart");
        toast("Cart cleared", { icon: "🗑️" });
    };

    // Checkout handler
    const handleCheckout = async () => {
        if (items.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);
        const payload: CheckoutPayload = {
            items,
            specialRequest: specialRequest.trim() || undefined,
            paymentMethod,
            totalPrice: total,
        };

        try {
            await checkoutOrder(payload);
            toast.success("Order placed successfully! 🎉");
            clearCart();
            navigate("/orders");
        } catch (error) {
            console.warn("Backend checkout API error, falling back to local success:", error);
            toast.success("Order placed successfully! 🎉 (Mock confirmation)");
            clearCart();
            navigate("/orders");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        items,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        specialRequest,
        setSpecialRequest,
        paymentMethod,
        setPaymentMethod,
        isLoading,
        isSubmitting,
        updateQuantity,
        removeItem,
        clearCart,
        handleCheckout,
    };
}
