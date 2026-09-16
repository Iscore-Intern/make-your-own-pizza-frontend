import { useState, useMemo ,useEffect} from "react";
import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { GetIngredients } from "@/Core/APIs/Ingredients/GetIngredients.API";
import { DeleteIngredient } from "@/Core/APIs/Ingredients/DeleteIngredient.API";

import toast from "react-hot-toast";

const CATEGORY_NAMES: Record<number, string> = {
    0: "Meats",
    1: "Veggies",
    2: "Cheese",
};

const normalizeCategory = (cat: unknown): string => {
    if (typeof cat === "number" && CATEGORY_NAMES[cat]) {
        return CATEGORY_NAMES[cat];
    }
    return String(cat || "Other");
};

export default function useIngredients() {
    const [ingredients, setIngredients] = useState<ingredientItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetIngredients()
            .then((data) => {
                if (Array.isArray(data)) {
                    const normalized = data.map((item) => ({
                        ...item,
                        category: normalizeCategory(item.category),
                    }));
                    setIngredients(normalized);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Couldn't Load Ingredients", error);
                toast.error("Failed to load ingredients from server");
                setIsLoading(false);
            });
    }, []);

    const filteredIngredients = useMemo(() => {
        return ingredients.filter((item) => {
            const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const tabMatch = activeTab === "All" || item.category === activeTab;
            return searchMatch && tabMatch;
        });
    }, [ingredients, searchQuery, activeTab]);

    const groupedCategories = useMemo(() => {
        return filteredIngredients.reduce((result, currentItem) => {
            const categName = currentItem.category;
            if (!result[categName]) {
                result[categName] = [];
            }
            result[categName].push(currentItem);
            return result;
        }, {} as Record<string, ingredientItem[]>);
    }, [filteredIngredients]);

    const handleDelete = async (id: string | number) => {
        try {
            await DeleteIngredient(id);
            setIngredients((prev) => prev.filter((i) => String(i.id) !== String(id)));
            toast.success("Ingredient deleted successfully");
        } catch (error) {
            console.error("Failed to delete ingredient:", error);
            toast.error("Failed to delete ingredient");
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        ingredients,
        setIngredients,
        isLoading,
        groupedCategories,
        categories: ["All", "Meats", "Veggies", "Cheese"],
        handleDelete,
    };
}