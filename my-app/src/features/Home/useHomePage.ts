import { useState, useEffect, useMemo } from "react";
import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { GetIngredients } from "@/Core/APIs/Ingredients/GetIngredients.API";
import { PizzaSize, SizeOption, CustomPizzaConfig } from "@/Core/Interfaces/Home/PizzaCustomization.Interface";
import toast from "react-hot-toast";

export const SIZE_OPTIONS: SizeOption[] = [
    { size: "Small", label: "Small (10\")", inches: 10, basePrice: 120, scale: 0.88 },
    { size: "Medium", label: "Medium (12\")", inches: 12, basePrice: 160, scale: 1.0 },
    { size: "Large", label: "Large (14\")", inches: 14, basePrice: 200, scale: 1.12 },
];

export const CATEGORIES = ["All", "Meats", "Veggies", "Cheese"];

// Fallback mock ingredients matching the existing Ingredients module
const mockIngredients: ingredientItem[] = [
    {
        id: "1",
        name: "Pepperoni",
        price: 20,
        colorHex: "#B22222",
        isAvailable: true,
        category: "Meats",
    },
    {
        id: "2",
        name: "Italian Sausage",
        price: 22,
        colorHex: "#8B4513",
        isAvailable: true,
        category: "Meats",
    },
    {
        id: "3",
        name: "Mushroom",
        price: 15,
        colorHex: "#A0522D",
        isAvailable: true,
        category: "Veggies",
    },
    {
        id: "4",
        name: "Black Olives",
        price: 12,
        colorHex: "#000000",
        isAvailable: true,
        category: "Veggies",
    },
    {
        id: "5",
        name: "Fresh Basil",
        price: 10,
        colorHex: "#228B22",
        isAvailable: true,
        category: "Veggies",
    },
    {
        id: "6",
        name: "Extra Mozzarella",
        price: 18,
        colorHex: "#FFA500",
        isAvailable: true,
        category: "Cheese",
    },
];

export default function useHomePage() {
    const [ingredients, setIngredients] = useState<ingredientItem[]>(mockIngredients);
    const [selectedSize, setSelectedSize] = useState<PizzaSize>("Medium");
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>(["1", "5"]); // Default to Pepperoni & Basil for preview
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch ingredients using the shared API
    useEffect(() => {
        setIsLoading(true);
        GetIngredients()
            .then((data) => {
                if (data && data.length > 0) {
                    setIngredients(data);
                }
            })
            .catch((error) => {
                console.warn("Backend Ingredients API not reachable, using local ingredients:", error);
                // Keep local mock ingredients
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
        toast.success(`Configured ${quantity} ${selectedSize} Pizza! 🍕`);
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
        toggleIngredient,
        selectSize,
        selectCategory,
        incrementQuantity,
        decrementQuantity,
        resetPizza,
        addToCart,
    };
}
