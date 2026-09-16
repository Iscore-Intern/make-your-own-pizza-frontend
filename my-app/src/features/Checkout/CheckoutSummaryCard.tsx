import { useNavigate } from "react-router-dom";

interface CheckoutSummaryCardProps {
    subtotal: number;
    deliveryFee: number;
    total: number;
    totalItemCount: number;
    paymentMethod: number;
    isSubmitting: boolean;
    onPlaceOrder: () => void;
}

export default function CheckoutSummaryCard({
    subtotal,
    deliveryFee,
    total,
    totalItemCount,
    paymentMethod,
    isSubmitting,
    onPlaceOrder,
}: CheckoutSummaryCardProps) {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center justify-between">
                <h2 className="text-lg font-black tracking-wide text-black-font">
                    Payment Summary 🧾
                </h2>
                <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                    {totalItemCount} Item{totalItemCount > 1 ? "s" : ""}
                </span>
            </div>

            <div className="p-6 flex flex-col gap-4">
                {/* Breakdown Rows */}
                <div className="flex flex-col gap-2.5 text-sm">
                    <div className="flex justify-between items-center text-sub-color font-semibold">
                        <span>Items Subtotal</span>
                        <span className="text-black-font font-bold">EGP {subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-sub-color font-semibold">
                        <span>Delivery Fee</span>
                        <span className="text-black-font font-bold">
                            {deliveryFee > 0 ? `EGP ${deliveryFee}` : "Free"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sub-color font-semibold pt-1">
                        <span>Payment Via</span>
                        <span className="text-black-font font-bold flex items-center gap-1">
                            <span>{paymentMethod === 0 ? "💵 Cash on Delivery" : "💳 Credit Card"}</span>
                        </span>
                    </div>
                </div>

                {/* Total Row */}
                <div className="pt-4 border-t-2 border-beige-dark flex items-center justify-between">
                    <span className="text-base font-black text-black-font">
                        Total Amount
                    </span>
                    <span className="text-2xl font-black text-black-font">
                        EGP {total}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onPlaceOrder}
                        disabled={isSubmitting || totalItemCount === 0}
                        className="w-full py-4 rounded-2xl bg-red-color text-white-color font-bold text-lg border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-4 hover:border-b-4 active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                        {isSubmitting ? (
                            <span>Confirming Order...</span>
                        ) : (
                            <>
                                <span>Confirm & Place Order</span>
                                <span>🔥</span>
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="w-full py-3 bg-white-color hover:bg-beige-color text-black-font font-bold text-sm rounded-2xl border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        ← Back to Cart
                    </button>
                </div>

                {/* Assurance Guarantee */}
                <div className="mt-2 p-3 rounded-xl bg-beige-color border border-black-font/15 flex items-center gap-2.5 text-xs text-sub-color font-bold">
                    <span className="text-base">⚡</span>
                    <span>Guaranteed hot & fresh delivery straight to your door</span>
                </div>
            </div>
        </div>
    );
}
