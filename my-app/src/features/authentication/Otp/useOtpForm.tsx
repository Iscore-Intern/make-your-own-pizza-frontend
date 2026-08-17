import { useRef, useState } from "react";
import axiosInstance from "../../../Shared/Interceptors/authentication.interceptor";
import axios from "axios";

interface UseOtpFormProps {
    email: string;
    onVerifySuccess: () => void;
}

export const useOtpForm = ({ email, onVerifySuccess }: UseOtpFormProps) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setSubmitting] = useState(false);
    const [fieldError, setFieldError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalOtpCode = otp.join('');
        if (finalOtpCode.length < 6) return alert("Please enter the full 6-digit code.");

        setSubmitting(true);
        setFieldError('');
        try {
            await axiosInstance.post('/Verify/verify', { otp: finalOtpCode, email });
            onVerifySuccess();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) alert(error.response.data.message);
                else setFieldError('Verification failed, try again');
            } else {
                setFieldError('An unexpected error occurred');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return { otp, isSubmitting, fieldError, inputRefs, handleChange, handleKeyDown, handleSubmit };
};