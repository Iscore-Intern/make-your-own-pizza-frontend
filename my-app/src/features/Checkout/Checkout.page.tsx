import { useNavigate } from "react-router-dom";
import useCheckout from "./useCheckout";
import DeliveryAddressCard from "./DeliveryAddressCard";
import OrderReviewCard from "./OrderReviewCard";
import PaymentMethodSelector from "@/features/Cart/PaymentMethodSelector";
import CheckoutSummaryCard from "./CheckoutSummaryCard";

export default function CheckoutPage() {
    const navigate = useNavigate();

    const {
        items,
        customerContact,
        deliveryAddress,
        formattedAddress,
        isEditingAddress,
        setIsEditingAddress,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        isSubmitting,
        errorMessage,
        updateContactField,
        updateAddressField,
        handlePlaceOrder,
    } = useCheckout();

    return (
        <div className="flex flex-col gap-6">
            {/* Sub Navigation Bar */}
            <div className="flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 px-3.5 py-2 bg-white-color text-black-font font-bold rounded-xl border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xs cursor-pointer shadow-xs"
                >
                    <span>←</span> Back to Cart
                </button>

                <div className="flex items-center gap-2 select-none">
                    <span className="font-black text-black-font text-lg tracking-wider">
                        CHECKOUT & DELIVERY 🍕
                    </span>
                </div>
            </div>

                {/* Empty Cart Notice */}
                {items.length === 0 ? (
                    <div className="w-full max-w-xl mx-auto my-12 bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-8 sm:p-12 text-center flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl border-2 border-black-font bg-beige-color flex items-center justify-center text-4xl mb-2 select-none">
                            🛒
                        </div>
                        <h3 className="text-2xl font-black text-black-font">
                            No Items to Checkout!
                        </h3>
                        <p className="text-sm font-semibold text-sub-color max-w-sm">
                            Your cart is currently empty. Please customize your favorite pizza first before checking out.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className="mt-4 px-6 py-3.5 bg-red-color hover:opacity-95 text-white-color font-bold text-base rounded-2xl border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer shadow-sm"
                        >
                            Craft a Pizza Now 🍕
                        </button>
                    </div>
                ) : (
                    /* Main Checkout Grid */
                    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Delivery Details, Order Review, Payment */}
                        <section className="lg:col-span-7 flex flex-col gap-5">
                            {/* 1. Delivery Address & Contact Card */}
                            <DeliveryAddressCard
                                contact={customerContact}
                                address={deliveryAddress}
                                formattedAddress={formattedAddress}
                                isEditing={isEditingAddress}
                                onToggleEdit={setIsEditingAddress}
                                onUpdateContact={updateContactField}
                                onUpdateAddress={updateAddressField}
                            />

                            {/* 2. Order Review Items */}
                            <OrderReviewCard items={items} />

                            {/* 3. Payment Method (Cash on Delivery) */}
                            <PaymentMethodSelector />
                        </section>

                        {/* Right Column: Checkout Summary (Sticky) */}
                        <aside className="lg:col-span-5 sticky top-8">
                            <CheckoutSummaryCard
                                subtotal={subtotal}
                                deliveryFee={deliveryFee}
                                total={total}
                                totalItemCount={totalItemCount}
                                isSubmitting={isSubmitting}
                                errorMessage={errorMessage}
                                onPlaceOrder={handlePlaceOrder}
                            />
                        </aside>
                    </main>
                )}
        </div>
    );
}
