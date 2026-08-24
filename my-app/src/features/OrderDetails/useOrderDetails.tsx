import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import axios from "axios";
import toast from "react-hot-toast";
import { OrderDetailsData } from "./orderinfo";
export const useOrderDetails=()=>{
    const {id}=useParams<{id:string}>();
    const [order, setOrder]=useState<OrderDetailsData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchOrder=async()=>{
            if (!id) return;
            setIsLoading(true);
            try{
                const response=await axiosInstance.get(`api/Orders/${id}`);
                setOrder(response.data);
            }
            catch(error){
                if(axios.isAxiosError(error)){
                    const backendMessage=error?.response?.data?.message;
                    toast.error(backendMessage);
                }
                else{
                    toast.error("An error occured, please try again later");
                }
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchOrder();
    },[id]);

    return{
        isLoading,
        order,
        id,
        error
    }
}