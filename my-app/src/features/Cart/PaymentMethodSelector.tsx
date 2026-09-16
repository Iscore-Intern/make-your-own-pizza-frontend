export default function PaymentMethodSelector() {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-black-font">
                    Payment Method 💵
                </h2>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-red-color bg-red-50/30 shadow-xs">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl border-2 border-black-font flex items-center justify-center text-lg bg-red-color text-white">
                            💵
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-black-font text-sm leading-tight">
                                Cash on Delivery
                            </span>
                            <span className="text-[11px] text-sub-color font-medium">
                                Pay with cash upon delivery at your door
                            </span>
                        </div>
                    </div>

                    <div className="w-5 h-5 rounded-full border-2 border-black-font flex items-center justify-center text-xs bg-red-color text-white font-bold">
                        ✓
                    </div>
                </div>
            </div>
        </div>
    );
}
