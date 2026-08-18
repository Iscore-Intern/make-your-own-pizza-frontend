import { useState } from "react";

export const useAuthPage = () => {
    const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp'>('signup');
    const [savedEmail, setSavedEmail] = useState('');

    const handleSignUpSuccess = (email: string) => {
        setSavedEmail(email);
        setCurrentView('otp');
    };

    const handleVerifySuccess = () => {
        setCurrentView('login');
    };

    const toggleView = () => {
        setCurrentView((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    // Return everything the UI needs
    return {
        currentView,
        savedEmail,
        handleSignUpSuccess,
        handleVerifySuccess,
        toggleView
    };
};