import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import Address from "../address/Address";
import useProfilePage from "@/Core/Hooks/Profile/useProfilePage.Hook";

export default function ProfilePage() {
    const { profile, isLoading, isEditing, formik, onEdit, onCancel, onSaveAddress } = useProfilePage();

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
            <Address
                city={profile.city}
                street={profile.street}
                district={profile.district}
                building_no={profile.building_no}
                floor_no={profile.floor_no}
                apt_no={profile.apt_no}
                onSave={onSaveAddress}
            />
        </div>
    );
}
