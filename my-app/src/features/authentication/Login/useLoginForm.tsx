import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../Core/Validation/Login.Validation"
<<<<<<< HEAD
import axiosInstance from "@/Core/Interceptors/authentication.interceptor";
=======
import axiosInstance from "../../../Core/Interceptors/Authentication.Interceptor";
>>>>>>> 7f073fb4c3647eca00b04398d9c0512f212f245f
import toast from 'react-hot-toast';
import axios from "axios";

export const useLoginForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const response = await axiosInstance.post('/Auth/login', values);
                const token = response.data.accessToken;
                if (token) {
                    localStorage.setItem('token', token);
                    toast.success("Welcome Back!");
                    navigate('/home');
                } else {
                    toast.error("Something Went Wrong, Please Try Again!");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendMessage = error.response?.data?.message;
                    if (backendMessage) {
                        toast.error(backendMessage);
                    } else {
                        toast.error("Login failed, Please try again");
                        setFieldError("email", "Login was unsuccessful, try again");
                    }
                } else {
                    toast.error("An unexpected error occurred");
                }
            } finally {
                setSubmitting(false);
            }
        }
    });

    return { formik };
};