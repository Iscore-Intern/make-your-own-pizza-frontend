import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader"
import ProfileForm from "./ProfileForm";
import { useProfileForm } from "./useProfileForm";

export default function ProfilePage() {
    const { formik, isEditing, onEdit, onCancel } = useProfileForm();
    return (
        <div className="page-container">
            <ProfileHeader
                firstName={formik.values.firstName}
                lastName={formik.values.lastName}
                email={formik.values.email} />
            <ProfileForm
                formik={formik}
                isEditing={isEditing}
                onEdit={onEdit}
                onCancel={onCancel}
            />
        </div>
    );
}