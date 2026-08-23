import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import Address from "../address/address";
import useProfilePage from "@/Core/Hooks/Profile/useProfilePage.Hook";
import "./Profile.css";

export default function ProfilePage() {
    const { profile, isLoading, isEditing, formik, onEdit, onCancel, onSaveAddress } = useProfilePage();

    if (isLoading) {
        return <div className="Page">Loading...</div>;
    }

    return (
        <div className="Page">
            <div className="profile-card">
                <ProfileHeader
                   // firstName={profile.firstName}
                    firstName="Karim"
                    //lastName={profile.lastName}
                    lastName="Ahmed"
                    //email={profile.email}
                    email="karim.ahmed@example.com"
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
