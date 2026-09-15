import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { SizeOption } from "@/Core/Interfaces/Home/PizzaCustomization.Interface";

interface PizzaOrderSummaryProps {
    sizeOption: SizeOption;
    selectedIngredients: ingredientItem[];
    basePrice: number;
    toppingsPrice: number;
    totalPrice: number;
    quantity: number;
    onIncrementQuantity: () => void;
    onDecrementQuantity: () => void;
    onRemoveIngredient: (id: string | number) => void;
    onAddToCart: () => void;
}

export default function PizzaOrderSummary({
    sizeOption,
    selectedIngredients,
    basePrice,
    toppingsPrice,
    totalPrice,
    quantity,
    onIncrementQuantity,
    onDecrementQuantity,
    onRemoveIngredient,
    onAddToCart,
}: PizzaOrderSummaryProps) {

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center justify-between">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Order Summary 🧾
                </h2>
                <span className="text-xs font-bold text-red-color uppercase tracking-wider">
                    {sizeOption.size} Pizza
                </span>
            </div>

            <div className="p-6 flex flex-col gap-5">
                {/* Active Toppings Pills */}
                <div>
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest block mb-2">
                        Toppings ({selectedIngredients.length})
                    </span>
                    {selectedIngredients.length === 0 ? (
                        <p className="text-xs text-sub-color italic">
                            No extra toppings selected (Base cheese & sauce)
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                            {selectedIngredients.map((item) => (
                                <span
                                    key={item.id}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-color border border-black-font text-xs font-bold text-black-font"
                                >
                                    <span>{item.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveIngredient(item.id)}
                                        className="text-sub-color hover:text-red-color cursor-pointer text-xs font-black leading-none"
                                        title={`Remove ${item.name}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-2 pt-3 border-t-2 border-beige-dark text-sm">
                    <div className="flex justify-between items-center text-sub-color font-semibold">
                        <span>Base Pizza ({sizeOption.inches}&quot;)</span>
                        <span className="text-black-font font-bold">EGP {basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sub-color font-semibold">
                        <span>Extra Toppings</span>
                        <span className="text-black-font font-bold">+EGP {toppingsPrice}</span>
                    </div>
                </div>

                {/* Quantity & Total */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-beige-dark">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sub-color uppercase tracking-widest mr-1">
                            Qty:
                        </span>
                        <button
                            type="button"
                            onClick={onDecrementQuantity}
                            className="w-8 h-8 rounded-xl border-2 border-black-font bg-beige-color text-black-font font-bold hover:bg-beige-dark flex items-center justify-center cursor-pointer transition-colors"
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-black text-black-font text-base">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={onIncrementQuantity}
                            className="w-8 h-8 rounded-xl border-2 border-black-font bg-beige-color text-black-font font-bold hover:bg-beige-dark flex items-center justify-center cursor-pointer transition-colors"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                            Total
                        </span>
                        <span className="text-2xl font-black text-black-font">
                            EGP {totalPrice}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={onAddToCart}
                        className="w-full py-3.5 bg-red-color hover:opacity-95 text-white-color font-bold text-base rounded-2xl border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-4 hover:border-b-4 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                        <span>Add to Order</span>
                        <span>🍕</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
