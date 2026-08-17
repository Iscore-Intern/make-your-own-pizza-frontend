import Field from "@/Shared/Components/Field/Field";
import { useSignUpForm } from "./useSignUpForm";

interface SignUpFormUIProps {
    formik: ReturnType<typeof useSignUpForm>['formik'];
}

export default function SignUpForm({ formik }: SignUpFormUIProps) {
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit} className="signup-form-grid">
                <Field label="First Name" type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.firstName as string} touched={formik.touched.firstName as boolean} readonly={false} />
                <Field label="Last Name" type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.lastName as string} touched={formik.touched.lastName as boolean} readonly={false} />
                <div className="flex-row full-width">
                    <Field label="Email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.email as string} touched={formik.touched.email as boolean} readonly={false} />
                </div>
                <div className="flex-row full-width">
                    <Field label="Phone Number" type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.phone as string} touched={formik.touched.phone as boolean} readonly={false} />
                </div>
                <Field label="Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.password as string} touched={formik.touched.password as boolean} readonly={false} />
                <Field label="Confirm Password" type="password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.confirmPassword as string} touched={formik.touched.confirmPassword as boolean} readonly={false} />

                <div className="role-selector full-width">
                    <button type="button" className={`role-btn ${formik.values.role === 2 ? 'active' : ''}`} onClick={() => formik.setFieldValue('role', 2)}>Customer</button>
                    <button type="button" className={`role-btn ${formik.values.role === 0 ? 'active' : ''}`} onClick={() => formik.setFieldValue('role', 0)}>Delivery</button>
                </div>

                <div className="full-width" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" disabled={formik.isSubmitting} style={{ width: "40%" }}>
                        {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
}