import { useNavigate } from "react-router-dom";
import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";

interface OrderReviewCardProps {
    items: CartItem[];
}

export default function OrderReviewCard({ items }: OrderReviewCardProps) {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center justify-between">
                <h2 className="text-lg font-black tracking-wide text-black-font flex items-center gap-2">
                    <span>Order Review</span>
                    <span>🍕</span>
                </h2>
                <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="text-xs font-black text-red-color hover:underline cursor-pointer"
                >
                    Edit Cart
                </button>
            </div>

            <div className="p-6 flex flex-col divide-y divide-gray-100">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl select-none" role="img" aria-label="pizza">
                                🍕
                            </span>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-black-font text-sm">
                                        {item.quantity > 1 ? `${item.quantity}x ` : ""}
                                        {item.name}
                                    </span>
                                    {item.size && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-beige-color border border-black-font text-black-font">
                                            {item.size}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <span className="text-xs text-sub-color font-medium line-clamp-1">
                                        {item.description}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="text-right pl-3">
                            <span className="font-bold text-black-font text-sm whitespace-nowrap">
                                EGP {item.price * item.quantity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
