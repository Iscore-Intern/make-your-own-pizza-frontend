import CartItem from "@/Core/Interfaces/Cart/CartItem.Interface";

interface CartItemCardProps {
    item: CartItem;
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItemCard({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemCardProps) {
    const itemTotal = item.price * item.quantity;

    return (
        <div className="w-full bg-white-color rounded-2xl border-2 border-black-font border-r-4 border-b-4 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
            {/* Left: Icon/Image & Details */}
            <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl border-2 border-black-font bg-beige-color flex items-center justify-center text-2xl flex-shrink-0 select-none">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    ) : (
                        "🍕"
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-black-font text-base leading-tight">
                            {item.name}
                        </span>
                        {item.size && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-beige-color border border-black-font text-black-font">
                                {item.size}
                            </span>
                        )}
                    </div>
                    {item.description && (
                        <span className="text-xs text-sub-color font-medium line-clamp-2">
                            {item.description}
                        </span>
                    )}
                    <span className="text-xs text-sub-color font-semibold">
                        EGP {item.price} each
                    </span>
                </div>
            </div>

            {/* Right: Stepper, Price & Remove */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                {/* Quantity Stepper */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-xl border-2 border-black-font bg-beige-color text-black-font font-bold hover:bg-beige-dark flex items-center justify-center cursor-pointer transition-colors"
                        title="Decrease quantity"
                    >
                        -
                    </button>
                    <span className="w-7 text-center font-black text-black-font text-base">
                        {item.quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-xl border-2 border-black-font bg-beige-color text-black-font font-bold hover:bg-beige-dark flex items-center justify-center cursor-pointer transition-colors"
                        title="Increase quantity"
                    >
                        +
                    </button>
                </div>

                {/* Total for Item */}
                <div className="flex flex-col items-end min-w-[70px]">
                    <span className="font-black text-black-font text-base">
                        EGP {itemTotal}
                    </span>
                    <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-[11px] font-bold text-red-color hover:underline cursor-pointer mt-0.5 transition-all"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
