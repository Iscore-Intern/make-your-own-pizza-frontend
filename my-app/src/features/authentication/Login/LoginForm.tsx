import React from "react";
import { useLoginForm } from "./useLoginForm";
import Field from "@/Shared/Components/Field/Field";

// Automatically extract the exact type of 'formik' from the hook
interface LoginFormUIProps {
    formik: ReturnType<typeof useLoginForm>['formik'];
}

export default function LoginForm({ formik }: LoginFormUIProps) {
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={formik.handleSubmit}>
                <Field
                    label="Email" type="email" name="email"
                    value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.errors.email as string} touched={formik.touched.email as boolean}
                    readonly={false}
                />
                <Field
                    label="Password" type="password" name="password"
                    value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.errors.password as string} touched={formik.touched.password as boolean}
                    readonly={false}
                />
                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Login'}
                </button>
            </form>
        </div>
    );
}