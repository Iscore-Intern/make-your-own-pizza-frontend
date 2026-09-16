import { useState, useEffect, useMemo } from "react";
import { Ingredient, Pizza } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { GetIngredients } from "@/Core/APIs/Ingredients/GetIngredients.API";
import { PizzaSize, SizeOption, CustomPizzaConfig } from "@/Core/Interfaces/Home/PizzaCustomization.Interface";
import { CartItem } from "@/Core/Interfaces/Cart/CartItem.Interface";
import toast from "react-hot-toast";

export const SIZE_OPTIONS: SizeOption[] = [
    { size: "Small", label: "Small (10\")", inches: 10, basePrice: 120, scale: 0.88 },
    { size: "Medium", label: "Medium (12\")", inches: 12, basePrice: 160, scale: 1.0 },
    { size: "Large", label: "Large (14\")", inches: 14, basePrice: 200, scale: 1.12 },
];

export const CATEGORIES = ["All", "Meats", "Veggies", "Cheese"];

const CATEGORY_NAMES: Record<number, string> = {
    0: "Meats",
    1: "Veggies",
    2: "Cheese",
};

const normalizeCategory = (cat: unknown): string => {
    if (typeof cat === "number" && CATEGORY_NAMES[cat]) {
        return CATEGORY_NAMES[cat];
    }
    if (typeof cat === "string") {
        const lower = cat.toLowerCase();
        if (lower.includes("meat")) return "Meats";
        if (lower.includes("veg")) return "Veggies";
        if (lower.includes("cheese")) return "Cheese";
        return cat;
    }
    return String(cat || "Other");
};

export default function useHomePage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [selectedSize, setSelectedSize] = useState<PizzaSize>("Medium");
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartCount, setCartCount] = useState<number>(() => {
        try {
            const raw = localStorage.getItem("cart");
            if (!raw) return 0;
            const items: CartItem[] = JSON.parse(raw);
            return Array.isArray(items) ? items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
        } catch {
            return 0;
        }
    });

    // Fetch ingredients using the shared API
    useEffect(() => {
        setIsLoading(true);
        GetIngredients()
            .then((data) => {
                if (data && data.ingredients) {
                    const normalized = data.ingredients.map((item) => ({
                        ...item,
                        category: normalizeCategory(item.category),
                    }));
                    setIngredients(normalized);
                }
                if (data && data.pizzas) {
                    setPizzas(data.pizzas);
                }
            })
            .catch((error) => {
                console.error("Failed to load menu ingredients from backend:", error);
                toast.error("Failed to load ingredients from server");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Current size details
    const currentSizeOption = useMemo(() => {
        return SIZE_OPTIONS.find((opt) => opt.size === selectedSize) || SIZE_OPTIONS[1];
    }, [selectedSize]);

    // Filtered ingredients by search & active category
    const filteredIngredients = useMemo(() => {
        return ingredients.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [ingredients, searchQuery, activeCategory]);

    // Selected ingredient objects
    const selectedIngredients = useMemo(() => {
        return ingredients.filter((item) => selectedIngredientIds.includes(String(item.id)));
    }, [ingredients, selectedIngredientIds]);

    // Price calculations
    const basePrice = currentSizeOption.basePrice;
    const toppingsPrice = useMemo(() => {
        return selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
    }, [selectedIngredients]);
    const unitPrice = basePrice + toppingsPrice;
    const totalPrice = unitPrice * quantity;

    // Actions
    const toggleIngredient = (id: string | number) => {
        const idStr = String(id);
        const item = ingredients.find((ing) => String(ing.id) === idStr);
        if (item && !item.isAvailable) {
            toast.error(`${item.name} is currently unavailable`);
            return;
        }

        setSelectedIngredientIds((prev) => {
            if (prev.includes(idStr)) {
                return prev.filter((item) => item !== idStr);
            } else {
                return [...prev, idStr];
            }
        });
    };

    const selectSize = (size: PizzaSize) => {
        setSelectedSize(size);
    };

    const selectCategory = (category: string) => {
        setActiveCategory(category);
    };

    const incrementQuantity = () => {
        setQuantity((q) => Math.min(20, q + 1));
    };

    const decrementQuantity = () => {
        setQuantity((q) => Math.max(1, q - 1));
    };

    const resetPizza = () => {
        setSelectedIngredientIds([]);
        setSelectedSize("Medium");
        setQuantity(1);
        toast("Pizza reset to plain cheese & sauce", { icon: "🍕" });
    };

    const addToCart = () => {
        const newItem: CartItem = {
            id: `pizza-${Date.now()}`,
            name: `Custom ${selectedSize} Pizza`,
            size: selectedSize,
            description:
                selectedIngredients.length > 0
                    ? selectedIngredients.map((i) => i.name).join(", ")
                    : "Plain Mozzarella & Tomato Sauce",
            price: unitPrice,
            quantity: quantity,
        };

        try {
            const raw = localStorage.getItem("cart");
            let items: CartItem[] = [];
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) items = parsed;
            }
            items.push(newItem);
            localStorage.setItem("cart", JSON.stringify(items));
            const newCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(newCount);

            // Instantly notify navbar & other components in the same tab
            window.dispatchEvent(new Event("storage"));
            window.dispatchEvent(new Event("cartUpdate"));

            toast.success(`Added ${quantity}x Custom ${selectedSize} Pizza to Cart! 🛒`);

            // Reset pizza builder back to initial state
            resetPizza();
        } catch {
            toast.error("Failed to add pizza to cart");
        }
    };

    const pizzaConfig: CustomPizzaConfig = {
        size: selectedSize,
        ingredients: selectedIngredients,
        basePrice,
        toppingsPrice,
        totalPrice,
        quantity,
    };

    return {
        ingredients,
        pizzas,
        filteredIngredients,
        selectedIngredients,
        selectedIngredientIds,
        selectedSize,
        currentSizeOption,
        activeCategory,
        searchQuery,
        setSearchQuery,
        quantity,
        isLoading,
        basePrice,
        toppingsPrice,
        unitPrice,
        totalPrice,
        pizzaConfig,
        cartCount,
        toggleIngredient,
        selectSize,
        selectCategory,
        incrementQuantity,
        decrementQuantity,
        resetPizza,
        addToCart,
    };
}
