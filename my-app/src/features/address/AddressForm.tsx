import Field from "@/Shared/Components/Field/Field";
import type AddressFormProps from "@/Core/Interfaces/Address/AddressFormProps.Interface";

export default function AddressForm({ formik, onCancel, onDelete }: AddressFormProps) {
    return (
        <div className="address-modal-overlay">
            <div className="address-modal">
                <form className="address-form" onSubmit={formik.handleSubmit}>
                    <h3 className="address-section-title">Edit Address</h3>

                    <div className="info-grid">
                        <Field
                            label="City"
                            type="text"
                            name="city"
                            value={formik.values.city}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.city}
                            touched={formik.touched.city}
                        />
                        <Field
                            label="Street"
                            type="text"
                            name="street"
                            value={formik.values.street}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.street}
                            touched={formik.touched.street}
                        />
                        <Field
                            label="District"
                            type="text"
                            name="district"
                            value={formik.values.district}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.district}
                            touched={formik.touched.district}
                        />
                        <Field
                            label="Building No"
                            type="text"
                            name="building_no"
                            value={formik.values.building_no}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.building_no}
                            touched={formik.touched.building_no}
                        />
                        <Field
                            label="Floor No"
                            type="text"
                            name="floor_no"
                            value={formik.values.floor_no}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.floor_no}
                            touched={formik.touched.floor_no}
                        />
                        <Field
                            label="Apartment No"
                            type="text"
                            name="apt_no"
                            value={formik.values.apt_no}
                            readonly={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.apt_no}
                            touched={formik.touched.apt_no}
                        />
                    </div>

                    <div className="btn-group-small">
                        <button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={onCancel} disabled={formik.isSubmitting}>
                            Cancel
                        </button>
                        <button type="button" onClick={onDelete} disabled={formik.isSubmitting}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
