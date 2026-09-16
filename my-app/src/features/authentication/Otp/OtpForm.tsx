import { useOtpForm } from "./useOtpForm";
import Button from "@/Shared/Components/Button";

type OtpFormUIProps = ReturnType<typeof useOtpForm> & {
    email?: string;
};

export default function OtpForm({
    otp,
    isSubmitting,
    fieldError,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    email,
}: OtpFormUIProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-black text-black-font mb-2 text-center tracking-wide">
                Verify Your Account
            </h2>
            <p className="text-sm font-semibold text-sub-color text-center mb-6 max-w-xs">
                We sent a 6-digit verification code to
                {email ? (
                    <span className="block text-red-color font-bold mt-0.5 truncate">{email}</span>
                ) : (
                    " your email"
                )}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                {fieldError && (
                    <div className="bg-red-50 border-2 border-red-500 text-red-color px-3 py-2 rounded-xl text-xs font-bold text-center border-r-4 border-b-4">
                        {fieldError}
                    </div>
                )}

                {/* 6 Digit OTP Inputs */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 my-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-black text-black-font bg-white-color rounded-2xl border-2 border-black-font border-r-4 border-b-4 focus:outline-none focus:bg-beige-color focus:border-red-color transition-all duration-200 shadow-sm select-none ${
                                digit ? "bg-beige-color" : ""
                            }`}
                        />
                    ))}
                </div>

                <Button type="submit" disabled={isSubmitting || otp.some((d) => !d)}>
                    {isSubmitting ? "Verifying..." : "Verify Code"}
                </Button>

                <p className="text-xs font-semibold text-sub-color text-center mt-2">
                    Didn&apos;t receive the code? Check your spam folder or wait a moment.
                </p>
            </form>
        </div>
    );
}