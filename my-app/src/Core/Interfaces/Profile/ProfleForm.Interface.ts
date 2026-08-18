import useProfileForm from "@/Core/Hooks/Profile/useProfileForm.Hook";

export default interface ProfileFormValues {
    formik: ReturnType<typeof useProfileForm>['formik'];
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    email: string;
}