import Field from "../../Shared/Components/Field/Field"
import type ProfileFormValues from "@/Core/Interfaces/Profile/ProfleForm.Interface";

export default function ProfileForm({ formik, isEditing, onEdit, onCancel, email }: ProfileFormValues) {
    return (
        <form className="profile-form" onSubmit={formik.handleSubmit}>
            <div className="profile-section">
                <div className="profile-section-header">
                    <h3 className="profile-section-title">Basic Information</h3>
                    {!isEditing &&
                        <button type="button" onClick={onEdit}>
                            Edit Profile
                        </button>}
                </div>

                <div className="info-grid">
                    <Field
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        readonly={!isEditing}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.firstName as string}
                        touched={formik.touched.firstName as boolean}
                    />
                    <Field
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        readonly={!isEditing}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.lastName as string}
                        touched={formik.touched.lastName as boolean}
                    />
                    <Field
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        readonly={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Field
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={formik.values.phone}
                        readonly={!isEditing}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.phone as string}
                        touched={formik.touched.phone as boolean}
                    />
                </div>

                {isEditing && (
                    <div className="btn-group-small">
                        <button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={onCancel} disabled={formik.isSubmitting}>
                            Cancel
                        </button>
                    </div>
                )}

            </div>
        </form>
    )
}
