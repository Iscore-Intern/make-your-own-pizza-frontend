import useIngredients from "./useIngredients";
import CategoriesList from "./CategoriesList";
import AddIngredientForm from "./AddIngredientForm";
import Cheese from "../../assets/cheese.png"
import BG from "../../../BG.jpg"
export default function IngredientsManager(){
    const { 
        searchQuery, 
        setSearchQuery, 
        activeTab, 
        setActiveTab, 
        groupedCategories,
        categories,
        handleDelete
    } = useIngredients();
    return(
        < div className="w-full min-h-screen" style={{ backgroundImage: `url(${BG})` }}>
            <div className="max-w-4xl mx-auto mt-24 flex flex-start flex-col">
                <span className="text-lg font-semi-bold text-red-color tracking-widest">MANAGER</span>
                <h1 className="text-3xl font-bold text-black-font tracking-widest ">
                    Ingredients
                    <img src={Cheese} className="w-10 h-10 inline-block ml-2"></img>
                </h1>
            </div>
            <AddIngredientForm/>    
            <div className="max-w-4xl mx-auto my-5 p-6 bg-white-color rounded-2xl  overflow-hidden border-r-8 border-b-8 border-l-2 border-t-2 border-black-font">
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
    )
}