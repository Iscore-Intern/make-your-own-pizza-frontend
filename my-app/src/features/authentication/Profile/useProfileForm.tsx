import { useFormik } from "formik";
import { profileSchema } from "../../../Core/Validation/Profile.Validation";
import axiosInstance from "../../../Shared/Interceptors/Authentication.Interceptor";
import toast from 'react-hot-toast';

type ProfileFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export const useProfileForm = (initialValues: ProfileFormValues) => {
    const formik = useFormik({
        initialValues,
        validationSchema: profileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await axiosInstance.put('/Profile', values);
                toast.success("Profile updated!");
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error("Something Went Wrong, Please Try Again!");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return { formik };
};
