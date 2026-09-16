import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";
import { getCart } from "@/Core/APIs/Cart/getCart.API";
import toast from "react-hot-toast";

export default function useCart() {
    const navigate = useNavigate();

    // Initialize items from localStorage or empty
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
        return [];
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isSubmitting = false;

    // Sync items to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(items));
            window.dispatchEvent(new Event("storage"));
            window.dispatchEvent(new Event("cartUpdate"));
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
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("cartUpdate"));
        toast("Cart cleared", { icon: "🗑️" });
    };

    // Checkout handler - navigate to dedicated Checkout page
    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    return {
        items,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        isLoading,
        isSubmitting,
        updateQuantity,
        removeItem,
        clearCart,
        handleCheckout,
    };
}
