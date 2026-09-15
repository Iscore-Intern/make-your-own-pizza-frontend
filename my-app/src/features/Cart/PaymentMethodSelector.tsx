interface PaymentMethodSelectorProps {
    selectedMethod: number; // 0: Cash on Delivery, 1: Visa/MasterCard
    onSelectMethod: (method: number) => void;
}

export default function PaymentMethodSelector({
    selectedMethod,
    onSelectMethod,
}: PaymentMethodSelectorProps) {
    const options = [
        { id: 0, label: "Cash on Delivery", icon: "💵", desc: "Pay with cash at your door" },
        { id: 1, label: "Credit / Debit Card", icon: "💳", desc: "Visa, MasterCard" },
    ];

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-black-font">
                    Payment Method 💳
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
                {options.map((opt) => {
                    const isSelected = selectedMethod === opt.id;

                    return (
                        <div
                            key={opt.id}
                            onClick={() => onSelectMethod(opt.id)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                                isSelected
                                    ? "border-red-color bg-red-50/30 shadow-xs"
                                    : "border-black-font/20 bg-white-color hover:border-black-font"
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <div
                                    className={`w-10 h-10 rounded-xl border-2 border-black-font flex items-center justify-center text-lg transition-colors ${
                                        isSelected
                                            ? "bg-red-color text-white"
                                            : "bg-beige-color text-black-font"
                                    }`}
                                >
                                    {opt.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-black-font text-sm leading-tight">
                                        {opt.label}
                                    </span>
                                    <span className="text-[11px] text-sub-color font-medium">
                                        {opt.desc}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`w-5 h-5 rounded-full border-2 border-black-font flex items-center justify-center text-xs ${
                                    isSelected ? "bg-red-color text-white font-bold" : "bg-white"
                                }`}
                            >
                                {isSelected ? "✓" : ""}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
