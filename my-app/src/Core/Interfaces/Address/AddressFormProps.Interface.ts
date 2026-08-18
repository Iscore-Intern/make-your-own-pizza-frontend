import useAddressForm from "@/Core/Hooks/Address/useAddressForm.Hook";

export default interface AddressFormProps {
    formik: ReturnType<typeof useAddressForm>['formik'];
    onCancel: () => void;
    onDelete: () => void;
}
