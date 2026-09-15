import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";

export const DeleteIngredient=async(id: string | number) =>{
    const response=await axiosInstance.delete(`mahshyKosaa/${id}`);
    return response.data;
}

