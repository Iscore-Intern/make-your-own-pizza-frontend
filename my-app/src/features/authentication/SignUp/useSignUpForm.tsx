import { useFormik } from "formik";
import { signUpSchema } from "../../../Core/Validation/Signup.Validation";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptor";
import axios from "axios";
import toast from "react-hot-toast";

interface UseSignUpFormProps {
    onSignUpSuccess: (email: string) => void;
}

export const useSignUpForm = ({ onSignUpSuccess }: UseSignUpFormProps) => {
    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '', role: 2 },
        validationSchema: signUpSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                await axiosInstance.post('/Auth/register', values);
                onSignUpSuccess(values.email);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendMessage = error.response?.data?.message;
                    if (backendMessage) {
                        toast.error(backendMessage);
                    } else {
                        toast.error("SignUp failed, Please try again");
                        setFieldError("email", "Signup was unsuccessful, try again");
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