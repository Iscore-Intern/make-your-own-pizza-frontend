import useIngredients from "./useIngredients";
import CategoriesList from "./CategoriesList";
import AddIngredientForm from "./AddIngredientForm";
import Cheese from "../../assets/cheese.png";

export default function IngredientsManager() {
    const { 
        searchQuery, 
        setSearchQuery, 
        activeTab, 
        setActiveTab, 
        groupedCategories,
        categories,
        handleDelete
    } = useIngredients();

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex flex-start flex-col">
                <span className="text-sm font-bold text-red-color tracking-widest uppercase">
                    MANAGER PORTAL
                </span>
                <h1 className="text-3xl font-extrabold text-black-font tracking-wide flex items-center gap-2">
                    Ingredients
                    <img src={Cheese} alt="Cheese" className="w-9 h-9 inline-block" />
                </h1>
            </div>
            <AddIngredientForm />    
            <div className="p-6 bg-white-color rounded-2xl overflow-hidden border-r-8 border-b-8 border-l-2 border-t-2 border-black-font">
                <CategoriesList 
                    categories={categories}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    groupedCategories={groupedCategories}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}