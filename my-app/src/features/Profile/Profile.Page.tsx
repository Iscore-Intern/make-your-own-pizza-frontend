import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import useProfileForm from "@/Core/Hooks/useProfileForm.Hook";
import FetchUserProfile from "@/Core/APIs/Profile/FetchUserProfile.API";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";

const emptyProfile: UserData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    district: "",
    building_no: "",
    floor_no: "",
    apt_no: "",
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserData>(emptyProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const { formik } = useProfileForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await FetchUserProfile();
                setProfile(data);
                formik.resetForm({
                    values: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                    },
                });
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onEdit = () => setIsEditing(true);
    const onCancel = () => {
        formik.resetForm();
        setIsEditing(false);
    };

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
