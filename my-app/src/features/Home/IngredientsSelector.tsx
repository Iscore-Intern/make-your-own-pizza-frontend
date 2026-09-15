import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";

interface IngredientsSelectorProps {
    categories: string[];
    activeCategory: string;
    searchQuery: string;
    filteredIngredients: ingredientItem[];
    selectedIngredientIds: string[];
    onSelectCategory: (category: string) => void;
    onSearchChange: (query: string) => void;
    onToggleIngredient: (id: string | number) => void;
}

export default function IngredientsSelector({
    categories,
    activeCategory,
    searchQuery,
    filteredIngredients,
    selectedIngredientIds,
    onSelectCategory,
    onSearchChange,
    onToggleIngredient,
}: IngredientsSelectorProps) {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center justify-between">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Choose Toppings 🧀
                </h2>
                <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                    {selectedIngredientIds.length} Selected
                </span>
            </div>

            <div className="p-6 flex flex-col gap-5">
                {/* Category Pills & Search */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    {/* Category Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => onSelectCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl border-2 border-black-font font-bold text-xs transition-all cursor-pointer ${
                                        isActive
                                            ? "bg-red-color text-white-color border-r-3 border-b-3"
                                            : "bg-white-color text-black-font hover:bg-beige-color"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Field */}
                    <div className="sm:w-48">
                        <input
                            type="text"
                            placeholder="Search toppings..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border-2 border-beige-dark text-black-font placeholder-sub-color text-xs focus:outline-none focus:border-black-font bg-white-color"
                        />
                    </div>
                </div>

                {/* Ingredients Grid */}
                {filteredIngredients.length === 0 ? (
                    <div className="py-8 text-center text-sub-color font-semibold text-sm">
                        No toppings found matching &quot;{searchQuery}&quot;.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                        {filteredIngredients.map((item) => {
                            const isSelected = selectedIngredientIds.includes(String(item.id));
                            const isAvailable = item.isAvailable;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        if (isAvailable) {
                                            onToggleIngredient(item.id);
                                        }
                                    }}
                                    className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all select-none ${
                                        isAvailable
                                            ? "cursor-pointer hover:border-black-font"
                                            : "cursor-not-allowed opacity-50"
                                    } ${
                                        isSelected
                                            ? "border-red-color bg-red-50/30 shadow-xs"
                                            : "border-black-font/20 bg-white-color"
                                    }`}
                                >
                                    {/* Left: Color Dot & Details */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full border border-black-font flex-shrink-0"
                                            style={{ backgroundColor: item.colorHex || "#B22222" }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-black-font text-sm leading-tight">
                                                {item.name}
                                            </span>
                                            <span className="text-[11px] text-sub-color font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right: Price & Status */}
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-black-font text-xs">
                                            +EGP {item.price}
                                        </span>
                                        {isAvailable ? (
                                            <div
                                                className={`w-6 h-6 rounded-lg border-2 border-black-font flex items-center justify-center text-xs font-bold transition-colors ${
                                                    isSelected
                                                        ? "bg-red-color text-white"
                                                        : "bg-beige-color text-black-font"
                                                }`}
                                            >
                                                {isSelected ? "✓" : "+"}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-bold">
                                                Out
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
