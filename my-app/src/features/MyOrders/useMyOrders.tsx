import { useEffect, useState } from "react";
import { Order } from "./Order";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import axios from "axios";
import toast from "react-hot-toast";

const fakeData: Order[] = [
    {
        orderId: "1",
        pizzaCount: 2,
        createdAt: "10/9/2011",
        totalPrice: 100,
        status: "On the Way",
    },
    {
        orderId: "2",
        pizzaCount: 2,
        createdAt: "10/9/2011",
        totalPrice: 100,
        status: "Delivered",
    },
    {
        orderId: "3",
        pizzaCount: 1,
        createdAt: "10/9/2011",
        totalPrice: 100,
        status: "Waiting For Delivery",
    },
    {
        orderId: "4",
        pizzaCount: 2,
        createdAt: "10/9/2011",
        totalPrice: 100,
        status: "Cancelled",
    }
];
export const useMyOrders = () => {
    const [orders, setOrders] = useState<Order[]>(fakeData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);

    const handleChange = (value: boolean) => {
        setIsActive(value);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(`api/Orders/isActive=${isActive}`);
                setOrders(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendMessage = error?.response?.data?.message;
                    toast.error(backendMessage);
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