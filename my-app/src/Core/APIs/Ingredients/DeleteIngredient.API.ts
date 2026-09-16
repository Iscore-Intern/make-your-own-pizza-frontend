import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const DeleteIngredient = async (id: string | number) => {
    const response = await axiosInstance.delete(`/Ingredients/${id}`);
    return response.data;
};

