import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../Core/Validation/Login.Validation"
import axiosInstance from "@/Shared/Interceptors/authentication.interceptor";
import toast from 'react-hot-toast';

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
                console.error("Error logging in:", error);
                setFieldError('email', 'Wrong Email or Password');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return { formik };
};