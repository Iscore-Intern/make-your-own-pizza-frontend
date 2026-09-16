import { useEffect, useState, useMemo } from "react";
import { orderShape } from "@/Core/Interfaces/ordersDashboard/orderShape";
import { getOrders } from "@/Core/APIs/Dashboard/getOrders.API";

export const useDashboard = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [orders, setOrders] = useState<orderShape[]>([]);
    const [activeTab, setActiveTab] = useState<string>("All");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const data = await getOrders();
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Couldn't load orders", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch = 
                order.id.toString().includes(searchQuery) || 
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesTab = false;
            if (activeTab === "All") {
                matchesTab = true;
            } else if (activeTab === "Pending") {
                matchesTab = order.status === "Waiting For Delivery";
            } else if (activeTab === "In Progress") {
                matchesTab = order.status === "On the Way";
            } else if (activeTab === "Completed") {
                matchesTab = order.status === "Delivered" || order.status === "Cancelled";
            }
            return matchesSearch && matchesTab;
        });
    }, [orders, searchQuery, activeTab]);

    return{
        isLoading,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        filteredOrders
    }
}