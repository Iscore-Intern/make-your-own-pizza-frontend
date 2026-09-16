import { useEffect, useState } from "react";
import { Order } from "./Order";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import axios from "axios";
import toast from "react-hot-toast";

export const useMyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(true);

    const handleChange = (value: boolean) => {
        setIsActive(value);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get<Order[]>("/Order", {
                    params: { isActive },
                });
                setOrders(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendMessage = error?.response?.data?.message;
                    toast.error(backendMessage || "Failed to load orders");
                } else {
                    toast.error("Sorry, Orders' Loading Failed, Try Again!");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [isActive]);

    return {
        orders,
        isLoading,
        isActive,
        handleChange
    };
};