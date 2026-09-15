import { PizzaSize, SizeOption } from "@/Core/Interfaces/Home/PizzaCustomization.Interface";

interface PizzaSizeSelectorProps {
    sizes: SizeOption[];
    selectedSize: PizzaSize;
    onSelectSize: (size: PizzaSize) => void;
}

export default function PizzaSizeSelector({
    sizes,
    selectedSize,
    onSelectSize,
}: PizzaSizeSelectorProps) {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-4 sm:p-5">
            <span className="text-xs font-bold text-sub-color uppercase tracking-widest block mb-3 text-center sm:text-left">
                Select Size
            </span>
            <div className="grid grid-cols-3 gap-3">
                {sizes.map((opt) => {
                    const isSelected = selectedSize === opt.size;

                    return (
                        <button
                            key={opt.size}
                            type="button"
                            onClick={() => onSelectSize(opt.size)}
                            className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 border-black-font transition-all cursor-pointer ${
                                isSelected
                                    ? "bg-red-color text-white-color border-r-4 border-b-4 translate-x-0 translate-y-0 shadow-xs"
                                    : "bg-white-color text-black-font hover:bg-beige-color hover:border-r-3 hover:border-b-3"
                            }`}
                        >
                            <span className="font-bold text-base leading-tight">
                                {opt.size}
                            </span>
                            <span
                                className={`text-xs mt-0.5 ${
                                    isSelected ? "text-white/80 font-medium" : "text-sub-color font-medium"
                                }`}
                            >
                                {opt.inches}&quot;
                            </span>
                            <span
                                className={`text-xs font-bold mt-1 ${
                                    isSelected ? "text-white" : "text-black-font"
                                }`}
                            >
                                EGP {opt.basePrice}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
