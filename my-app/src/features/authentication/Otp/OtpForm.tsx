import { useOtpForm } from "./useOtpForm";

type OtpFormUIProps = ReturnType<typeof useOtpForm>;

export default function OtpForm({
    otp, isSubmitting, fieldError, inputRefs, handleChange, handleKeyDown, handleSubmit
}: OtpFormUIProps) {
    return (
        <form className="otp-form-container" onSubmit={handleSubmit}>
            <div className="full-width text-center">
                <h2 className="text-2xl font-bold text-black-font mb-6 text-center">Enter Verification Code</h2>
                <p className="texl-lg font-bold text-sub-color ">We sent a 6-digit OTP to your mail</p>
            </div>
            {fieldError && <p style={{ color: 'red', textAlign: 'center' }}>{fieldError}</p>}

            <div className="otp-inputs-container">
                {otp.map((digit, index) => (
                    <input
                        key={index} type="text" maxLength={1} value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        className="otp-input"
                    />
                ))}
            </div>
            <div className="full-width" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button type="submit" style={{ width: "100%" }} disabled={isSubmitting}>
                    {isSubmitting ? "Verifying..." : "Verify"}
                </button>
            </div>
        </form>
    );
}