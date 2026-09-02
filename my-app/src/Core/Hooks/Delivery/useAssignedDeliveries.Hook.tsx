import {useEffect, useState} from "react";
import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import FetchAssignedDeliveries from "@/Core/APIs/Delivery/FetchAssignedDeliveries.API";

const PAGE_SIZE = 10;

export default function useAssignedDeliveries() {

    const [assignedDeliveries, setAssignedDeliveries] = useState<DeliveryDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        let cancelled = false;
        
        const fetchDeliveries = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await FetchAssignedDeliveries(currentPage, PAGE_SIZE);
                if (!cancelled){
                setAssignedDeliveries(data.items);
                setTotalCount(data.totalCount);
                }
            } catch (error) {
                if (!cancelled){
                    console.error("Error fetching assigned deliveries:", error);
                    setError("Failed to load assigned deliveries.");
                }
            } finally {
                if (!cancelled){
                setIsLoading(false);
                }
            }
        };

        fetchDeliveries();

        return() => {
            cancelled = true;
        }

    }, [currentPage]);

    const gotoNextPage = () => {
        if (currentPage * PAGE_SIZE < totalCount) {
            setCurrentPage(page => page + 1);
        }
    };
    const gotoPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(page => page - 1);
        }
    };

    
    return {
        assignedDeliveries,
        isLoading,
        error,
        currentPage,
        pageSize: PAGE_SIZE,
        totalCount,
        gotoNextPage,
        gotoPrevPage };
    
}