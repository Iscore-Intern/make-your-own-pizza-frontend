import { OrderItem } from "@/Core/Interfaces/ManagerViewOrder/ManagerViewOrder.Interface";

interface OrderDetailsCardProps {
    items: OrderItem[];
    totalPrice: number;
}

export default function OrderDetailsCard({ items, totalPrice }: OrderDetailsCardProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Items 🍕
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col divide-y divide-gray-100">
                    {items.map((item) => {
                        const toppingsText = item.toppings?.join(", ");

                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl select-none" role="img" aria-label="pizza">
                                        🍕
                                    </span>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-black-font text-base">
                                                {item.quantity > 1 ? `${item.quantity}x ` : ""}{item.name}
                                            </span>
                                            {item.size && (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-beige-color border border-black-font text-black-font">
                                                    {item.size}
                                                </span>
                                            )}
                                        </div>
                                        {toppingsText && (
                                            <span className="text-xs text-sub-color font-medium">
                                                {toppingsText}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="font-bold text-black-font text-base">
                                    EGP {item.price * (item.quantity || 1)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4 border-t-2 border-beige-dark flex items-center justify-between">
                    <span className="text-sub-color font-medium text-base">
                        Total
                    </span>
                    <span className="text-2xl font-black text-black-font">
                        EGP {totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}