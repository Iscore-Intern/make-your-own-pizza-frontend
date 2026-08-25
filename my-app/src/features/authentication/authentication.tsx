import LoginFormPage from "./Login/LoginForm.page";
import SignUpFormPage from "./SignUp/SignUpForm.Page"; 
import OtpFormPage from "./Otp/OtpForm.Page";
import './authentication.css'; 
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
        <div 
        style={{}}
        className="Page">
            <div className="Information-Container">

                <div className="bg-red-color p-8 flex flex-col justify-between text-white-color relative">
                    <div className="flex flex-col items-center text-center mt-6">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 ">
                            <span className="text-4xl ">🍕</span>
                        </div>
                            <h1 className="text-4xl font-extrabold tracking-wide">Make Your Own Pizza</h1>
                            <p className="text-sm font-semibold tracking-wider opacity-90 mt-1">YOU ARE THE BEST CHEF!</p>
                    </div>
                </div>
                {/* right side */}
                <div className="p-8 bg-white flex flex-col justify-center">
                    <div className="w-full">
                        {currentView === 'login' && <LoginFormPage />}
                        {currentView === 'signup' && (
                            <SignUpFormPage onSignUpSuccess={handleSignUpSuccess} />
                        )}
                        {currentView === 'otp' && (
                            <OtpFormPage email={savedEmail} onVerifySuccess={handleVerifySuccess} />
                        )}
                    </div>
                    {currentView !== "otp" && (
                        <div className="text-center mt-6 text-sm">
                            <p className="text-sub-color">
                                {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <button onClick={toggleView} className="text-red-color font-bold hover:underline toggle-btn">
                                    {currentView === 'login' ? 'Create an account' : 'Login'}
                                </button>
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}