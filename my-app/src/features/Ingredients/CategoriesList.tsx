import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
interface CategoriesListProps{
    categories: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    groupedCategories: Record<string, ingredientItem[]>;
    handleDelete: (id: string | number) => void;
}

export default function CategoriesList({
    categories, 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    groupedCategories,
    handleDelete
}: CategoriesListProps){
    return(
        <div className="w-full divide-y-2 divide-black-font">
            <div className="flex items-center justify-between pb-5">
                <div>
                    {categories.map((Category)=>(
                        <button 
                        key={Category}
                        onClick={()=>setActiveTab(Category)}
                        className={`font-bold text-sm rounded-xl mx-1 px-4 py-2 transition-colors border border-black-font border-r-4 border-b-4 border-l-1 border-t-1
                            ${Category===activeTab?
                                "bg-red-color text-white-color":"bg-beige-color text-sub-color"
                            }
                            `}
                        >{Category}</button>
                    ))}
                </div>
                <input 
                    type="text"
                    value={searchQuery}
                    name="searchbar"
                    onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setSearchQuery(event?.target.value)}
                    placeholder="Search ingredients..."
                    className="bg-beige-color border-2 font-semi-bold text-sm border-beige-dark text-dark-beige p-2 rounded-xl focus:outline-none"
                ></input>
            </div>
            {Object.entries(groupedCategories).map(([categName, categItems])=>(
                <div key={categName} className="flex flex-col mb-8 pb-5 pt-3 ">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-black text-black-font">{categName}</h2>
                        <span className="text-sm text-red-color font-bold bg-red-100 px-2 rounded-full">
                            {categItems.length}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center text-xs font-semi-bold text-sub-color mb-4 px-2 tracking-widest">
                            <div className="w-1/2">INGREDIENT</div>
                            <div className="w-1/4">PRICE</div>
                            <div className="w-1/4">AVAILABILITY</div>
                        </div>
                        {categItems.map((ingredient) => 
                            <div key={ingredient.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3 w-1/2">
                                    <div 
                                        className="rounded-full w-4 h-4"
                                        style={{backgroundColor:ingredient.colorHex}}>
                                    </div>
                                    <p className="font-semi-bold text-black-font">{ingredient.name}</p>
                                </div>
                                <div className="w-1/4 flex items-center gap-6">
                                    <p className="font-semi-bold text-black-font">EGP {ingredient.price}</p>
                                </div>
                                <div className="w-1/4 flex justify-between">
                                    <span className={`px-3 py-1 rounded-full text-sm border ${
                                        ingredient.isAvailable 
                                            ? "bg-green-100 text-green-700 border-green-700" 
                                            : "bg-red-100 text-red-700 border-red-700"
                                    }`}>
                                        {ingredient.isAvailable ? "In stock" : "Out of stock"}
                                    </span>
                                    <button className="text-red-500 font-bold text-sm " onClick={()=>{handleDelete(ingredient.id)}}>
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}