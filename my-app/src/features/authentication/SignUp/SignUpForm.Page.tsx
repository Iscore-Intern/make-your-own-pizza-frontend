import SignUpForm from "./SignUpForm";
import { useSignUpForm } from "./useSignUpForm";

interface SignUpFormPageProps {
    onSignUpSuccess: (email: string) => void;
}

export default function SignUpFormPage({ onSignUpSuccess }: SignUpFormPageProps) {
    const { formik } = useSignUpForm({ onSignUpSuccess });
    return <SignUpForm formik={formik} />;
}