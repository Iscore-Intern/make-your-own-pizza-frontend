import { useState } from "react";

export const useAuthPage = () => {
    // 1. State for controlling which form is visible
    const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp'>('signup');

    // 2. State for temporarily holding the email between signup and OTP verification
    const [savedEmail, setSavedEmail] = useState('');

    // 3. Handler for when a user successfully submits the signup form
    const handleSignUpSuccess = (email: string) => {
        setSavedEmail(email);
        setCurrentView('otp');
    };

    // 4. Handler for when a user successfully verifies their OTP
    const handleVerifySuccess = () => {
        setCurrentView('login');
    };

    // 5. Handler for the bottom toggle button (Sign Up <-> Login)
    const toggleView = () => {
        setCurrentView((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    // Return all these pieces so the AuthPage UI can use them
    return {
        currentView,
        savedEmail,
        handleSignUpSuccess,
        handleVerifySuccess,
        toggleView
    };
};