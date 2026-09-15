import UserData from "../Profile/UserData.Interface";
import { OrderDetailsData } from "@/features/OrderDetails/orderinfo";

export default interface ManagerViewOrder extends OrderDetailsData {
    customerData: UserData;
    customerNote?:string;
}