import * as Yup from 'yup'
export const profileSchema = Yup.object({
    firstName: Yup.string().min(3, 'First name must be at least 3 characters').matches(/[a-zA-Z]/, 'First name must contain only letters').required('First name is required'),
    lastName: Yup.string().min(3, 'Last name must be at least 3 characters').matches(/[a-zA-Z]/, 'Last name must contain only letters').required('Last name is required'),
    phone: Yup.string().min(11, 'Phone must be at least 11 digits').max(11, 'Phone must not exceed 11 digits').matches(/[0-9]/, 'Phone must contain only numbers').required('Phone is required'),
});
