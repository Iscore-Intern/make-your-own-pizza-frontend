import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const logoutAPI = async (userId: string) => {
    const response = await axiosInstance.post("/Auth/logout", JSON.stringify(userId), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    return response.data;
};
