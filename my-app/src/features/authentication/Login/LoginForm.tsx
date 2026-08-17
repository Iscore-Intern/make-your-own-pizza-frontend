import { useLoginForm } from "./useLoginForm";
import Input from "@/Shared/Components/Field/Field";
export default function LoginForm() {
    const { formik } = useLoginForm();
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={formik.handleSubmit}>

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email as string}
                    touched={formik.touched.email as boolean}
                    readonly={false}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password as string}
                    touched={formik.touched.password as boolean}
                    readonly={false}
                />

                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
