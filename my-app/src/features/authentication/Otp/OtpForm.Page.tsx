import React from "react";
import OtpForm from "./OtpForm";
import { useOtpForm } from "./useOtpForm";

interface OtpFormPageProps {
    email: string;
    onVerifySuccess: () => void;
}

export default function OtpFormPage({ email, onVerifySuccess }: OtpFormPageProps) {
    const otpLogic = useOtpForm({ email, onVerifySuccess });
    return <OtpForm {...otpLogic} />;
}