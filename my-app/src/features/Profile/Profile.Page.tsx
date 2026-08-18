import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import useProfilePage from "@/Core/Hooks/Profile/useProfilePage.Hook";

export default function ProfilePage() {
    const { profile, isLoading, isEditing, formik, onEdit, onCancel } = useProfilePage();

    if (isLoading) {
        return <div className="page-container">Loading...</div>;
    }

    return (
        <div className="page-container">
            <ProfileHeader
                firstName={profile.firstName}
                lastName={profile.lastName}
                email={profile.email} />
            <ProfileForm
                formik={formik}
                isEditing={isEditing}
                onEdit={onEdit}
                onCancel={onCancel}
                email={profile.email}
            />
        </div>
    );
}
