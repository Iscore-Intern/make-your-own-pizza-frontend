import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";
import CheckoutPayload, { CustomerContact } from "@/Core/Interfaces/Cart/CheckoutPayload.Interface";
import AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";
import FetchUserProfile from "@/Core/APIs/Profile/FetchUserProfile.API";
import { checkoutOrder } from "@/Core/APIs/Cart/checkout.API";
import toast from "react-hot-toast";

const initialContact: CustomerContact = {
    name: "",
    phone: "",
    email: "",
};

const initialAddress: AddressValues = {
    city: "",
    street: "",
    district: "",
    building_no: "",
    floor_no: "",
    apt_no: "",
};

export default function useCheckout() {
    const navigate = useNavigate();

    // Load Cart Items from localStorage
    const [items] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem("cart");
            if (raw) {
                const parsed = JSON.parse(raw) as CartItem[];
                if (Array.isArray(parsed)) return parsed;
            }
        } catch {
            // Ignore parse errors
        }
        return [];
    });

    const [customerContact, setCustomerContact] = useState<CustomerContact>(initialContact);
    const [deliveryAddress, setDeliveryAddress] = useState<AddressValues>(initialAddress);
    const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Fetch user profile from /User/me on load
    useEffect(() => {
        setIsLoading(true);
        FetchUserProfile()
            .then((userData) => {
                if (userData) {
                    const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
                    setCustomerContact((prev) => ({
                        ...prev,
                        name: fullName || prev.name,
                        phone: userData.phone || prev.phone,
                        email: userData.email || prev.email,
                    }));

                    if (userData.city || userData.street) {
                        setDeliveryAddress((prev) => ({
                            ...prev,
                            city: userData.city || prev.city,
                            street: userData.street || prev.street,
                            district: userData.district || prev.district,
                            building_no: userData.building_no || prev.building_no,
                            floor_no: userData.floor_no || prev.floor_no,
                            apt_no: userData.apt_no || prev.apt_no,
                        }));
                    }
                }
            })
            .catch((error) => {
                console.error("Failed to load user profile:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Formatted Address String
    const formattedAddress = useMemo(() => {
        const parts: string[] = [];
        if (deliveryAddress.building_no && deliveryAddress.street) {
            parts.push(`${deliveryAddress.building_no} ${deliveryAddress.street}`);
        } else if (deliveryAddress.street) {
            parts.push(deliveryAddress.street);
        }

        if (deliveryAddress.district) parts.push(deliveryAddress.district);
        if (deliveryAddress.city) parts.push(deliveryAddress.city);

        const details: string[] = [];
        if (deliveryAddress.floor_no) details.push(`Floor ${deliveryAddress.floor_no}`);
        if (deliveryAddress.apt_no) details.push(`Apt ${deliveryAddress.apt_no}`);

        let result = parts.join(", ");
        if (details.length > 0) {
            result += ` (${details.join(", ")})`;
        }
        return result || "Address not specified";
    }, [deliveryAddress]);

    // Financial calculations
    const subtotal = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const deliveryFee = items.length > 0 ? 20 : 0;
    const total = subtotal + deliveryFee;

    const totalItemCount = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    // Handlers
    const updateContactField = (field: keyof CustomerContact, value: string) => {
        setCustomerContact((prev) => ({ ...prev, [field]: value }));
    };

    const updateAddressField = (field: keyof AddressValues, value: string) => {
        setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) {
            toast.error("Your cart is empty! Add items first.");
            navigate("/cart");
            return;
        }

        if (!customerContact.name.trim()) {
            toast.error("Please enter your name");
            setIsEditingAddress(true);
            return;
        }

        if (!customerContact.phone.trim()) {
            toast.error("Please enter your phone number");
            setIsEditingAddress(true);
            return;
        }

        if (!deliveryAddress.street.trim() || !deliveryAddress.city.trim()) {
            toast.error("Please enter your street and city");
            setIsEditingAddress(true);
            return;
        }

        setIsSubmitting(true);
        const payload: CheckoutPayload = {
            items,
            customer: customerContact,
            deliveryAddress: {
                ...deliveryAddress,
                formatted: formattedAddress,
            },
            paymentMethod: 1, // 1: Cash on Delivery per backend specification
            totalPrice: total,
        };

        try {
            await checkoutOrder(payload);
            toast.success("Order placed successfully! 🎉");
            localStorage.removeItem("cart");
            navigate("/orders");
        } catch (error) {
            console.error("Backend checkout API error:", error);
            toast.error("Failed to place order. Please verify your details and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        items,
        customerContact,
        deliveryAddress,
        formattedAddress,
        isEditingAddress,
        setIsEditingAddress,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        isLoading,
        isSubmitting,
        updateContactField,
        updateAddressField,
        handlePlaceOrder,
    };
}
