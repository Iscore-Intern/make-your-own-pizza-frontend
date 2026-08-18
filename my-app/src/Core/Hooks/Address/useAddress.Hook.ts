import { useState } from "react";
import useAddressForm from "@/Core/Hooks/Address/useAddressForm.Hook";
import UpdateUserAddress from "@/Core/APIs/Address/UpdateUserAddress.API";
import type AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";

const emptyAddress: AddressValues = {
    city: "",
    street: "",
    district: "",
    building_no: "",
    floor_no: "",
    apt_no: "",
};

export default function useAddress(address: AddressValues, onSave: (data: UserData) => void) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { formik } = useAddressForm(address, (data) => {
        setIsModalOpen(false);
        onSave(data);
    });

    const onEdit = () => {
        formik.resetForm({ values: address });
        setIsModalOpen(true);
    };

    const onCancel = () => {
        formik.resetForm({ values: address });
        setIsModalOpen(false);
    };

    const onDelete = async () => {
        const data = await UpdateUserAddress(emptyAddress);
        setIsModalOpen(false);
        onSave(data);
    };

    return { isModalOpen, formik, onEdit, onCancel, onDelete };
}
