import useHomePage, { SIZE_OPTIONS, CATEGORIES } from "./useHomePage";
import PizzaCanvas from "./PizzaCanvas";
import PizzaSizeSelector from "./PizzaSizeSelector";
import IngredientsSelector from "./IngredientsSelector";
import PizzaOrderSummary from "./PizzaOrderSummary";

export default function HomePage() {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
        </div>
    );
}
