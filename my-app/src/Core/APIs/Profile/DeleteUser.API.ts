import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import toast from "react-hot-toast";

export const deleteCurrentUserAccount = async () => {
    try {
        await axiosInstance.delete("/User/me");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        toast.success("Account deleted successfully.");
    } catch (error) {
        toast.error("Failed to delete account.");
        throw error;
    }
};
