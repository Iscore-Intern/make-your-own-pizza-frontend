import { useState, useMemo ,useEffect} from "react";
import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { GetIngredients } from "@/Core/APIs/Ingredients/GetIngredients.API";
import { DeleteIngredient } from "@/Core/APIs/Ingredients/DeleteIngredient.API";

const mockIngredients: ingredientItem[] = [
    {
        id: "1",
        name: "Pepperoni",
        price: 20,
        colorHex: "#B22222", 
        isAvailable: true,
        category: "Meats"
    },
    {
        id: "2",
        name: "Italian Sausage",
        price: 22,
        colorHex: "#8B4513", 
        isAvailable: false, 
        category: "Meats"
    },
    {
        id: "3",
        name: "Mushroom",
        price: 15,
        colorHex: "#A0522D",
        isAvailable: true,
        category: "Veggies"
    },
    {
        id: "4",
        name: "Black Olives",
        price: 12,
        colorHex: "#000000",
        isAvailable: true,
        category: "Veggies"
    },
    {
        id: "5",
        name: "Fresh Basil",
        price: 10,
        colorHex: "#228B22", 
        isAvailable: true,
        category: "Veggies"
    },
    {
        id: "6",
        name: "Extra Mozzarella",
        price: 18,
        colorHex: "#FFA500", 
        isAvailable: true,
        category: "Cheese"
    }
];


export default function useIngredients(){
        const [ingredients, setIngredients]=useState(mockIngredients);
        const [searchQuery, setSearchQuery]=useState("");
        const [activeTab, setActiveTab]=useState("All");
        const [isLoading, setIsLoading]=useState(true);

        useEffect(()=>{
            GetIngredients()
            .then((data)=>{
                setIngredients(data);
                setIsLoading(false);
            }
            )
            .catch((error)=>{
                console.error("Couldn't Load Ingredients", error);
                setIsLoading(false);
            })
        },[])
    
        const filteredIngredients=useMemo(()=>{
            return ingredients.filter((item)=>{
                const searchMatch=item.name.toLowerCase().includes(searchQuery.toLowerCase());
                const tabMatch= activeTab === "All" || item.category===activeTab;
                return searchMatch && tabMatch;
            })
        },[ingredients,searchQuery,activeTab])
        
        const groupedCategories=useMemo(()=>{
            return filteredIngredients.reduce((result, currentItem)=>{
                const categName=currentItem.category;
                if(!result[categName]){
                    result[categName]=[];
                }
                result[categName].push(currentItem);
                return result;
            },{} as Record<string, ingredientItem[]>)
        },[filteredIngredients])

        const handleDelete = async (id: string | number) => {
            try {
                await DeleteIngredient(id);
                console.log(`Successfully deleted ingredient with id: ${id}`);
                window.location.reload(); 
            } catch (error) {
                console.error("Failed to delete ingredient:", error);
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
        handleDelete
    };
}