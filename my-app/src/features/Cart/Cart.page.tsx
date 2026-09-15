import { useNavigate } from "react-router-dom";
import useCart from "./useCart";
import CartItemCard from "./CartItemCard";
import SpecialRequestCard from "./SpecialRequestCard";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentSummaryCard from "./PaymentSummaryCard";
import BG from "../../../BG.jpg";

export default function CartPage() {
    const navigate = useNavigate();

    const {
        items,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        specialRequest,
        setSpecialRequest,
        paymentMethod,
        setPaymentMethod,
        isSubmitting,
        updateQuantity,
        removeItem,
        clearCart,
        handleCheckout,
    } = useCart();

    return (
        <div
            className="w-full min-h-screen py-8 px-4 sm:px-6"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/home")}
                        className="flex items-center gap-2 px-4 py-2 bg-white-color text-black-font font-bold rounded-xl border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm cursor-pointer"
                    >
                        <span>←</span> Back to Menu
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="font-black text-black-font text-xl tracking-wide">
                            My Cart 🛒
                        </span>
                        {totalItemCount > 0 && (
                            <span className="bg-red-color text-white px-2.5 py-0.5 rounded-full text-xs font-black">
                                {totalItemCount}
                            </span>
                        )}
                    </div>

                    {items.length > 0 ? (
                        <button
                            type="button"
                            onClick={clearCart}
                            className="text-xs font-bold text-sub-color hover:text-red-color underline cursor-pointer transition-colors"
                        >
                            Clear All
                        </button>
                    ) : (
                        <div />
                    )}
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <div className="w-full max-w-xl mx-auto my-12 bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-8 sm:p-12 text-center flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl border-2 border-black-font bg-beige-color flex items-center justify-center text-4xl mb-2 select-none">
                            🍕
                        </div>
                        <h3 className="text-2xl font-black text-black-font">
                            Your Cart is Empty!
                        </h3>
                        <p className="text-sm font-semibold text-sub-color max-w-sm">
                            Looks like you haven&apos;t crafted any custom pizzas yet. Head back and build your perfect slice!
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className="mt-4 px-6 py-3.5 bg-red-color hover:opacity-95 text-white-color font-bold text-base rounded-2xl border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-4 hover:border-b-4 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer shadow-sm"
                        >
                            Craft a Pizza Now 🍕
                        </button>
                    </div>
                ) : (
                    /* Main Cart Content Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Cart Items & Inputs */}
                        <div className="lg:col-span-7 flex flex-col gap-5">
                            {/* Items List */}
                            <div className="flex flex-col gap-3">
                                {items.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </div>

                            {/* Special Instructions Card */}
                            <SpecialRequestCard
                                value={specialRequest}
                                onChange={setSpecialRequest}
                            />

                            {/* Payment Method Selector Card */}
                            <PaymentMethodSelector
                                selectedMethod={paymentMethod}
                                onSelectMethod={setPaymentMethod}
                            />
                        </div>

                        {/* Right Column: Order & Payment Summary */}
                        <div className="lg:col-span-5 sticky top-8">
                            <PaymentSummaryCard
                                subtotal={subtotal}
                                deliveryFee={deliveryFee}
                                total={total}
                                totalItemCount={totalItemCount}
                                isSubmitting={isSubmitting}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
