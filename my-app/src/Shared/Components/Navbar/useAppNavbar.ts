import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RoleEnum } from "@/Core/Utils/auth.utils";
import { logoutAPI } from "@/Core/APIs/Auth/logout.API";
import { CartItem } from "@/Core/Interfaces/Cart/CartItem.Interface";
import toast from "react-hot-toast";

export const useAppNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Current user role
    const [role, setRole] = useState<number>(() => {
        const raw = localStorage.getItem("role");
        const num = raw !== null ? Number(raw) : NaN;
        return isNaN(num) ? RoleEnum.Customer : num;
    });

    // Cart items count for customer
    const [cartCount, setCartCount] = useState<number>(() => {
        try {
            const raw = localStorage.getItem("cart");
            if (!raw) return 0;
            const items: CartItem[] = JSON.parse(raw);
            return Array.isArray(items)
                ? items.reduce((sum, item) => sum + (item.quantity || 1), 0)
                : 0;
        } catch {
            return 0;
        }
    });

    // Keep role and cart count in sync with storage changes
    useEffect(() => {
        const syncState = () => {
            const rawRole = localStorage.getItem("role");
            const numRole = rawRole !== null ? Number(rawRole) : NaN;
            setRole(isNaN(numRole) ? RoleEnum.Customer : numRole);

            try {
                const rawCart = localStorage.getItem("cart");
                if (!rawCart) {
                    setCartCount(0);
                    return;
                }
                const items: CartItem[] = JSON.parse(rawCart);
                setCartCount(
                    Array.isArray(items)
                        ? items.reduce((sum, item) => sum + (item.quantity || 1), 0)
                        : 0
                );
            } catch {
                setCartCount(0);
            }
        };

        window.addEventListener("storage", syncState);
        // Also poll briefly on navigation
        syncState();

        return () => {
            window.removeEventListener("storage", syncState);
        };
    }, [location.pathname]);

    const handleLogout = async () => {
        const userId = localStorage.getItem("userId") || "";
        try {
            await logoutAPI(userId);
        } catch (error) {
            console.warn("Logout API call failed or unreachable, clearing session locally:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            localStorage.removeItem("cart");
        }
        toast.success("Logged out successfully");
        navigate("/");
    };

    return {
        role,
        cartCount,
        pathname: location.pathname,
        navigate,
        handleLogout,
    };
};
