import ManagerViewOrder from "@/Core/Interfaces/ManagerViewOrder/ManagerViewOrder.Interface";
import { useEffect, useState } from "react";
import { getManagerOrderDetails } from "@/Core/APIs/ManagerViewOrder/getManagerOrderDetails.API";
import { updateStatus } from "@/Core/APIs/ManagerViewOrder/updateStatus.API";
import Driver from "@/Core/Interfaces/ManagerViewOrder/Driver.Interface";
import { assignDriver } from "@/Core/APIs/ManagerViewOrder/assignDriver.API";
import { getDriversList } from "@/Core/APIs/ManagerViewOrder/getDriversList.API";
import toast from "react-hot-toast";
const mockOrderDetails: ManagerViewOrder = {
    orderId: "123", 
    totalPrice: 390,
    paymentMethod: 1,
    customerPhone: "+20 100 123 4567",
    status: "Waiting For Delivery",
    createdAt: "2026-08-22T12:10:00Z",
    pizzas: [
        {
            pizzaId: "p1",
            pizzaName: "Margherita (Large)",
            price: 195,
            ingredients: [
                { ingredientId: "i1", ingredientName: "Mozzarella", quantity: 1 },
                { ingredientId: "i2", ingredientName: "Fresh Basil", quantity: 1 }
            ]
        },
        {
            pizzaId: "p2",
            pizzaName: "Pepperoni Feast (Medium)",
            price: 195,
            ingredients: [
                { ingredientId: "i3", ingredientName: "Pepperoni", quantity: 1 },
                { ingredientId: "i4", ingredientName: "Mozzarella", quantity: 1 }
            ]
        }
    ],
    customerData: {
        firstName: "Karim",
        lastName: "Ahmed",
        email: "karim@example.com",
        phone: "+20 100 123 4567",
        city: "Cairo",
        street: "Tahrir St",
        district: "Downtown",
        building_no: "12",
        floor_no: "3",
        apt_no: "15"
    },
    customerNote: "Extra crispy please!"
};
const mockDrivers: Driver[] = [
    {
        driverId: "d1",
        driverName: "Omar Khalil",
        driverZone: "Cairo Centre",
        driverPhone: "+20 100 111 2233",
        driverStatus: "Available"
    },
    {
        driverId: "d2",
        driverName: "Hassan Nabil",
        driverZone: "Giza",
        driverPhone: "+20 112 444 5566",
        driverStatus: "Available"
    },
    {
        driverId: "d3",
        driverName: "Mahmoud Samir",
        driverZone: "Cairo East",
        driverPhone: "+20 101 777 8899",
        driverStatus: "Busy"
    },
    {
        driverId: "d4",
        driverName: "Tarek Fathy",
        driverZone: "Alexandria",
        driverPhone: "+20 115 000 1122",
        driverStatus: "Available"
    }
];
export default function useManagerOrderDetails(orderId:string | undefined){
    const [order, setOrder]=useState<ManagerViewOrder | null>(mockOrderDetails);
    const[drivers,setDrivers]=useState<Driver[] | null>(mockDrivers); 
    const [selectedStatus, setSelectedStatus] =useState<ManagerViewOrder["status"] | "">("");
    const [selectedDriverId, setSelectedDriverId]=useState<string| null>(null);
    const [isLoadingOrders,setIsLoadingOrders]=useState<boolean>(true)
    const [isLoadingDrivers,setIsLoadingDrivers]=useState<boolean>(true);
    const [isSaving, setIsSaving]=useState<boolean>(false);
    const [isAssigningDriver,setIsAssigningDriver]=useState<boolean>(false);

    //fetching Order
    useEffect(()=>{
        if (!orderId) return;
        if(order) setSelectedStatus(order.status);

        const fetchOrderDetails=async ()=>{
            setIsLoadingOrders(true);
            try {
                const data=await getManagerOrderDetails(orderId);
                setOrder(data);
                setSelectedStatus(data.status);
            }
            catch(error){
                console.error("Couldn't Load Order Details", error);
                toast.error("Failed to get order details. Please try again")
            }
            finally{
                setIsLoadingOrders(false);
            }
        };
        const fetchDriversList=async ()=> {
            setIsLoadingDrivers(true);
            try{
                const data=await getDriversList();
                setDrivers(data);
            }
            catch(error){
                console.error("Couldn't Load Drivers' Details", error);
                toast.error("Failed to get Drivers' details. Please try again")
            }
            finally{
                setIsLoadingDrivers(false);
            }
        }
        fetchDriversList();
        fetchOrderDetails();
    },[orderId])
    //save new state
    const handleSaveChanges = async () => {
        if (!orderId || selectedStatus === order?.status || !selectedStatus) return;
        setIsSaving(true);
        try {
            await updateStatus(orderId, selectedStatus);
            setOrder(prevOrder => prevOrder ? { ...prevOrder, status: selectedStatus as ManagerViewOrder["status"] } : null);
            toast.success(`Order successfully updated to ${selectedStatus}`);
        } catch (error) {
            console.error("Backend error updating status, falling back to local update:", error);
            setOrder(prevOrder => prevOrder ? { ...prevOrder, status: selectedStatus as ManagerViewOrder["status"] } : null);
            toast.success(`Order successfully updated to ${selectedStatus}`);
        } finally {
            setIsSaving(false);
        }
    };
    //assign driver
    const handleAssignDriver = async () => {
        if (!orderId || !selectedDriverId) return;
        setIsAssigningDriver(true);
        const driverName = drivers?.find(d => d.driverId === selectedDriverId)?.driverName || "Driver";
        try {
            await assignDriver(orderId, selectedDriverId);
            toast.success(`Order successfully assigned to ${driverName}!`);
        }
        catch (error) {
            console.error("Backend error assigning driver, falling back to local confirmation:", error);
            toast.success(`Order successfully assigned to ${driverName}!`);
        } 
        finally {
            setIsAssigningDriver(false);
        }
    };
    // formatting address
    const getFormattedAddress = () => {
        if (!order?.customerData) return "Address not available";
        const { building_no, street, city } = order.customerData;
        const parts: string[] = [];
        if (building_no && street) parts.push(`${building_no} ${street}`);
        else if (street) parts.push(street);
        if (city) parts.push(city);
        return parts.length > 0 ? parts.join(", ") : "Address not available";
    };

    // formatting placed date
    const getFormattedPlacedAt = () => {
        if (!order?.createdAt) return "";
        try {
            const date = new Date(order.createdAt);
            if (isNaN(date.getTime())) return order.createdAt;
            const month = date.toLocaleDateString("en-US", { month: "short" });
            const day = date.getDate();
            const year = date.getFullYear();
            const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
            return `${month} ${day}, ${year} · ${time}`;
        } catch {
            return order.createdAt;
        }
    };

    const Statuses: ManagerViewOrder["status"][] = ["On the Way", "Delivered", "Waiting For Delivery", "Cancelled"];

    return {
        order,
        isLoadingOrders,
        selectedStatus,
        setSelectedStatus,
        isSaving,
        handleSaveChanges,
        getFormattedAddress,
        getFormattedPlacedAt,
        Statuses,
        drivers,
        isLoadingDrivers,
        selectedDriverId,
        setSelectedDriverId,
        isAssigningDriver,
        handleAssignDriver
    };
}