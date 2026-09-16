import { useRef, useState } from "react";
import axiosInstance from "@/Core/Interceptors/Authentication.Interceptors";
import axios from "axios";
import toast from "react-hot-toast";

interface UseOtpFormProps {
    email: string;
    onVerifySuccess: () => void;
}

export const useOtpForm = ({ email, onVerifySuccess }: UseOtpFormProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [fieldError, setFieldError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d+$/.test(pastedData)) {
            const digits = pastedData.slice(0, 6).split("");
            const newOtp = [...otp];
            digits.forEach((d, i) => {
                newOtp[i] = d;
            });
            setOtp(newOtp);
            const focusIndex = Math.min(digits.length, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalOtpCode = otp.join("");
        if (finalOtpCode.length < 6) {
            setFieldError("Please enter the complete 6-digit code.");
            return;
        }

        setSubmitting(true);
        setFieldError("");
        try {
            await axiosInstance.post("/Verify/verify", { otp: finalOtpCode, email });
            toast.success("Email verified successfully! You can now log in.");
            onVerifySuccess();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    setFieldError(error.response.data.message);
                } else {
                    setFieldError("Verification failed. Please check the code and try again.");
                }
            } else {
                setFieldError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return {
        otp,
        isSubmitting,
        fieldError,
        inputRefs,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleSubmit,
    };
};