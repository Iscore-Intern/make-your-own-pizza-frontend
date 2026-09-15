    import { useFormik } from "formik";
import { addressSchema } from "../../Validation/Address.Validation";
import type AddressValues from "../../Interfaces/Address/AddressValues.Interface";
import type UserData from "../../Interfaces/Profile/UserData.Interface";
import UpdateUserAddress from "../../APIs/Address/UpdateUserAddress.API";

export default function useAddressForm(initialValues: AddressValues, onSuccess?: (data: UserData) => void) {
    const formik = useFormik<AddressValues>({
        initialValues,
        validationSchema: addressSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const data = await UpdateUserAddress(values);
                onSuccess?.(data);
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    return { formik };
};
