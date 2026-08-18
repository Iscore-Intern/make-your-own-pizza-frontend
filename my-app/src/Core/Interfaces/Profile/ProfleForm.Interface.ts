import useProfileForm from "@/Core/Hooks/useProfileForm.Hook";

export default interface ProfileFormValues {
    formik: ReturnType<typeof useProfileForm>['formik'];
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    email: string;
}