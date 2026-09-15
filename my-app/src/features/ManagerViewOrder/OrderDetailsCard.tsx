import { PizzaItem } from "../OrderDetails/orderinfo";

interface OrderDetailsCardProps {
    pizzas: PizzaItem[];
    totalPrice: number;
}

export default function OrderDetailsCard({ pizzas, totalPrice }: OrderDetailsCardProps) {
    if (!pizzas || pizzas.length === 0) return null;

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Items 🍕
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col divide-y divide-gray-100">
                    {pizzas.map((pizza) => {
                        const ingredientsText = pizza.ingredients
                            ?.map((ing) => ing.ingredientName)
                            .join(", ");

                        return (
                            <div
                                key={pizza.pizzaId}
                                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl select-none" role="img" aria-label="pizza">
                                        🍕
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-black-font text-base">
                                            {pizza.pizzaName}
                                        </span>
                                        {ingredientsText && (
                                            <span className="text-xs text-sub-color font-medium">
                                                {ingredientsText}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="font-bold text-black-font text-base">
                                    EGP {pizza.price}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4 border-t-2 border-beige-dark flex items-center justify-between">
                    <span className="text-sub-color font-medium text-base">
                        Total
                    </span>
                    <span className="text-2xl font-black text-black-font">
                        EGP {totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}