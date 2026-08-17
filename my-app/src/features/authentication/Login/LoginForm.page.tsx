import React from "react";
import LoginForm from "./LoginForm";
import { useLoginForm } from "./useLoginForm";
export default function LoginFormPage() {
    const { formik } = useLoginForm();
    return <LoginForm formik={formik} />;
}