import { useFormik } from "formik";
import { profileSchema } from "../../Validation/Profile.Validation";
import type UpdateProfileValues from "../../Interfaces/Profile/UpdateProfileValues.Interface";
import type UserData from "../../Interfaces/Profile/UserData.Interface";
import UpdateUserProfile from "../../APIs/Profile/UpdateUserProfile.API";


export default function useProfileForm(initialValues: UpdateProfileValues, onSuccess?: (data: UserData) => void) {
    const formik = useFormik<UpdateProfileValues>({
        initialValues,
        validationSchema: profileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try{
                const data = await UpdateUserProfile(values);
                onSuccess?.(data);
            }
            finally{
            setSubmitting(false);
            }
    }
    });

    return { formik };
};
