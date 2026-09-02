import { orderStatus } from "./orderStatus.types";

export interface orderShape{
    id:string,
    customerName: string;
    itemsCount: number;
    totalPrice: number;
    status: orderStatus;
}