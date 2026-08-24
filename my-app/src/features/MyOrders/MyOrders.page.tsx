import MyOrders from "./MyOrders";
import { useMyOrders } from "./useMyOrders";

export default function MyOrdersPage() {
    const myOrdersLogic = useMyOrders();
    
    return (
            <MyOrders {...myOrdersLogic} />
    )
}