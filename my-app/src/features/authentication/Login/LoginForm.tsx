import { useLoginForm } from "./useLoginForm";
import Field from "@/Shared/Components/Field/Field";
import Button from "@/Shared/Components/Button";
interface LoginFormUIProps {
    formik: ReturnType<typeof useLoginForm>['formik'];
}

export default function LoginForm({ formik }: LoginFormUIProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-black-font mb-6 text-center">Login Page</h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
                <Button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Login'}
                </Button>
            </form>
        </div>
    );
}