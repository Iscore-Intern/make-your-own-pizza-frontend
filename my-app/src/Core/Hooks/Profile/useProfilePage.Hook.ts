import FetchUserProfile from "@/Core/APIs/Profile/FetchUserProfile.API";
import useProfileForm from "@/Core/Hooks/Profile/useProfileForm.Hook";
import { useEffect, useState } from "react";
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

export default function useProfilePage() {
    const [profile, setProfile] = useState<UserData>(emptyProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const { formik } = useProfileForm(
        {
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
        },
        (data) => {
            setProfile(data);
            setIsEditing(false);
        }
    );

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

    const onSaveAddress = (data: UserData) => setProfile(data);

    return { profile, isLoading, isEditing, formik, onEdit, onCancel, onSaveAddress };
}
