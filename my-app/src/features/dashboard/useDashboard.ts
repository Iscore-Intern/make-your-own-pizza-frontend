import { useEffect, useState, useMemo } from "react";
import { orderShape } from "@/Core/Interfaces/ordersDashboard/orderShape";
import { getOrders } from "@/Core/APIs/ordersDashboard/getOrders.API";

export const useDashboard=()=>{
    const [searchQuery, setSearchQuery]=useState<string>("");
    const [orders, setOrders]=useState<orderShape[]>([]);
    const [activeTab, setActiveTab]=useState<string>("");
    const [isLoading, setIsLoading]=useState<boolean>(true);

    useEffect(()=>{
        const fetchOrders = async()=>{
            try{
                setIsLoading(true);
                const data=await getOrders();
                setOrders(data);
            }
            catch(error){
                console.error("Couldn't load orders", error);
            }
            finally{
                setIsLoading(false);
            }
        } 
        fetchOrders();
    },[]);
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch = 
                order.id.toString().includes(searchQuery) || 
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesTab = false;            
            if (activeTab === "All") {
                matchesTab = true;
            } else if (activeTab === "Pending") {
                matchesTab = order.status === "Being assigned" || order.status === "Waiting for Delivery";
            } else if (activeTab === "In Progress") {
                matchesTab = order.status === "Preparing" || order.status === "Packing" || order.status === "On the Way";
            } else if (activeTab === "Completed") {
                matchesTab = order.status === "Delivered";
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