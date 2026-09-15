import { useEffect, useState } from "react";
import DeliveryDetails from "@/Core/Interfaces/Delivery/DeliveryDetails.Interface";
import FetchDeliveryDetails from "@/Core/APIs/Delivery/FetchDeliveryDetails.API";
import UpdateDeliveryStatus from "@/Core/APIs/Delivery/UpdateStatus.API";
import toast from "react-hot-toast";

export default function useDeliveryDetails(orderId: string | undefined) {
    const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setError("Invalid delivery order ID.");
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        const loadDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await FetchDeliveryDetails(orderId);
                if (!cancelled) {
                    setDelivery(data);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Error loading delivery details:", err);
                    setError("Failed to load delivery details.");
                    setDelivery(null);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadDetails();

        return () => {
            cancelled = true;
        };
    }, [orderId]);

    const changeStatus = async (newStatus: string) => {
        if (!orderId || !delivery) return;
        setIsUpdating(true);
        try {
            const updated = await UpdateDeliveryStatus(orderId, newStatus);
            setDelivery(prev => prev ? { ...prev, ...updated, status: newStatus } : null);
            toast.success(`Delivery status updated to "${newStatus}"`);
        } catch (err) {
            console.error("Error updating status:", err);
            toast.error("Failed to update delivery status.");
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        delivery,
        isLoading,
        isUpdating,
        error,
        changeStatus,
        setDelivery
    };
}
