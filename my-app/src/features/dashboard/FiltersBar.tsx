interface FiltersBarProps{
    activeTab : string;
    searchQuery: string;
    setActiveTab : (tab:string) => void;
    setSearchQuery : (query:string)=>void;
}

const Tabs=["All","Pending","In progress","Completed"];

export default function FiltersBar(
    {
        activeTab,
        searchQuery,
        setActiveTab,
        setSearchQuery
    } : FiltersBarProps
){
    return(
        <div className="flex justify-between ietms-center w-full mb-6">
            <div className="flex gap-3">
                {Tabs.map((tab)=>(
                    <button 
                    key={tab}
                    onClick={()=>setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full border-2 border-black font-semibold transition-colors
                        ${activeTab === tab 
                                    ? "bg-red-color text-white-color border-r-4 border-b-4 border-l-1 border-t-1" 
                                    : "bg-white-color text-black-font hover:bg-gray-100" }
                    `
                    }
                    >
                        {tab}
                    </button>
                )
                )}
            </div>
            <div className="w-72">
                <input 
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border-2 border-beige-dark focus:outline-none"
                    />
            </div>
        </div>
    )
}