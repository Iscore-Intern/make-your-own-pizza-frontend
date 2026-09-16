import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import Address from "../address/address";
import useProfilePage from "@/Core/Hooks/Profile/useProfilePage.Hook";
import "./Profile.css";

export default function ProfilePage() {
    const { profile, isLoading, isEditing, formik, onEdit, onCancel, onSaveAddress } = useProfilePage();

    if (isLoading) {
        return <div className="flex justify-center items-center py-12 text-lg font-bold text-gray-500">Loading...</div>;
    }

    return (
        <div className="flex justify-center w-full py-2">
            <div className="profile-card">
                <ProfileHeader
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    email={profile.email}
                />
                <div className="profile-body">
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
            </div>
        </div>
    );
}
