import * as Yup from 'yup'

export const addressSchema = Yup.object({
    city: Yup.string().min(2, 'City must be at least 2 characters').required('City is required'),
    street: Yup.string().min(2, 'Street must be at least 2 characters').required('Street is required'),
    district: Yup.string().min(2, 'District must be at least 2 characters').required('District is required'),
    building_no: Yup.string().required('Building number is required'),
    floor_no: Yup.string().required('Floor number is required'),
    apt_no: Yup.string().required('Apartment number is required'),
});
