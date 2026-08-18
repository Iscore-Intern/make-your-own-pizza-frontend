// Import the .page versions of your forms since those are the Containers!
import LoginFormPage from "./Login/LoginForm.page";
import SignUpFormPage from "./SignUp/SignUpForm.Page"; 
import OtpFormPage from "./Otp/OtpForm.Page";
import './authentication.css'; // Make sure this matches your CSS file name

// Tell TypeScript what props we are expecting from the hook
interface AuthenticationUIProps {
    currentView: 'login' | 'signup' | 'otp';
    savedEmail: string;
    handleSignUpSuccess: (email: string) => void;
    handleVerifySuccess: () => void;
    toggleView: () => void;
}

export default function Authentication({
    currentView, savedEmail, handleSignUpSuccess, handleVerifySuccess, toggleView
}: AuthenticationUIProps) {
    return (
        <div className="auth-container">
            {/* Visuals */}
            <div className="pizza-ring pizza-ring--1"></div>
            <div className="pizza-ring pizza-ring--2"></div>
            <div className="pizza-ring pizza-ring--3"></div>
            <div className="pizza-ring pizza-ring--4"></div>

            <div className="topping t-1"></div>
            <div className="topping t-2"></div>
            <div className="topping t-3"></div>
            <div className="topping t-4"></div>

            <div className={`form-card ${currentView === "signup" ? 'signup-mode' : "login-mode"}`}>
                
                {/* Render the appropriate child Page Container based on state */}
                {currentView === 'login' && <LoginFormPage />}
                
                {currentView === 'signup' && (
                    <SignUpFormPage onSignUpSuccess={handleSignUpSuccess} />
                )}
                
                {currentView === 'otp' && (
                    <OtpFormPage email={savedEmail} onVerifySuccess={handleVerifySuccess} />
                )}

                {/* The bottom toggle button */}
                {currentView !== "otp" && (
                    <div className="text-center mt-3 full-width">
                        <p>
                            {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={toggleView} className="toggle-btn">
                                {currentView === 'login' ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}