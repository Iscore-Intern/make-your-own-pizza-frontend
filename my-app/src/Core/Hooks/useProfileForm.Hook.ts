import { useFormik } from "formik";
import { profileSchema } from "../Validation/Profile.Validation";
import type UpdateProfileValues from "../Interfaces/Profile/UpdateProfileValues.Interface";
import UpdateUserProfile from "../APIs/Profile/UpdateUserProfile.API";


export default function useProfileForm(initialValues: UpdateProfileValues) {
    const formik = useFormik<UpdateProfileValues>({
        initialValues,
        validationSchema: profileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try{
                await UpdateUserProfile(values); // Fetch the user profile before updating
            }
            finally{
            setSubmitting(false);
            }
    }
    });

    return { formik };
};
