import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import CheckoutPayload from "@/Core/Interfaces/Cart/CheckoutPayload.Interface";

export const checkoutOrder = async (payload: CheckoutPayload) => {
    const response = await axiosInstance.post("api/Orders", payload);
    return response.data;
};
