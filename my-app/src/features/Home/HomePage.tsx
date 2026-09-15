import { useNavigate } from "react-router-dom";
import useHomePage, { SIZE_OPTIONS, CATEGORIES } from "./useHomePage";
import PizzaCanvas from "./PizzaCanvas";
import PizzaSizeSelector from "./PizzaSizeSelector";
import IngredientsSelector from "./IngredientsSelector";
import PizzaOrderSummary from "./PizzaOrderSummary";
import BG from "../../../BG.jpg";

export default function HomePage() {
    const navigate = useNavigate();

    const {
        filteredIngredients,
        selectedIngredients,
        selectedIngredientIds,
        selectedSize,
        currentSizeOption,
        activeCategory,
        searchQuery,
        setSearchQuery,
        quantity,
        basePrice,
        toppingsPrice,
        totalPrice,
        toggleIngredient,
        selectSize,
        selectCategory,
        incrementQuantity,
        decrementQuantity,
        resetPizza,
        addToCart,
    } = useHomePage();

    return (
        <div
            className="w-full min-h-screen py-6 px-4 sm:px-6"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                {/* Top Navigation Bar */}
                <header className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div
                        onClick={() => navigate("/home")}
                        className="flex items-center gap-2 cursor-pointer select-none"
                    >
                        <span className="text-2xl" role="img" aria-label="pizza">
                            🍕
                        </span>
                        <div>
                            <span className="font-black text-black-font text-lg tracking-wider block leading-tight">
                                MAKE YOUR PIZZA
                            </span>
                            <span className="text-[11px] font-bold text-red-color tracking-widest block uppercase">
                                Craft & Customize
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="px-3.5 py-2 rounded-xl border-2 border-black-font text-xs font-bold bg-white-color hover:bg-beige-color text-black-font transition-all cursor-pointer"
                        >
                            Dashboard
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className="px-3.5 py-2 rounded-xl border-2 border-black-font text-xs font-bold bg-white-color hover:bg-beige-color text-black-font transition-all cursor-pointer"
                        >
                            My Orders
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="px-3.5 py-2 rounded-xl border-2 border-black-font text-xs font-bold bg-white-color hover:bg-beige-color text-black-font transition-all cursor-pointer"
                        >
                            Profile
                        </button>
                    </div>
                </header>

                {/* Main Content Grid: Left/Center = Pizza & Size, Right = Ingredients & Summary */}
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Interactive Pizza Canvas & Size Selector */}
                    <section className="lg:col-span-5 flex flex-col gap-5 sticky top-6">
                        <PizzaCanvas
                            sizeOption={currentSizeOption}
                            selectedIngredients={selectedIngredients}
                            onReset={resetPizza}
                        />

                        <PizzaSizeSelector
                            sizes={SIZE_OPTIONS}
                            selectedSize={selectedSize}
                            onSelectSize={selectSize}
                        />
                    </section>

                    {/* Right Column: Ingredients Selector & Order Summary */}
                    <section className="lg:col-span-7 flex flex-col gap-5">
                        <IngredientsSelector
                            categories={CATEGORIES}
                            activeCategory={activeCategory}
                            searchQuery={searchQuery}
                            filteredIngredients={filteredIngredients}
                            selectedIngredientIds={selectedIngredientIds}
                            onSelectCategory={selectCategory}
                            onSearchChange={setSearchQuery}
                            onToggleIngredient={toggleIngredient}
                        />

                        <PizzaOrderSummary
                            sizeOption={currentSizeOption}
                            selectedIngredients={selectedIngredients}
                            basePrice={basePrice}
                            toppingsPrice={toppingsPrice}
                            totalPrice={totalPrice}
                            quantity={quantity}
                            onIncrementQuantity={incrementQuantity}
                            onDecrementQuantity={decrementQuantity}
                            onRemoveIngredient={toggleIngredient}
                            onAddToCart={addToCart}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
}
