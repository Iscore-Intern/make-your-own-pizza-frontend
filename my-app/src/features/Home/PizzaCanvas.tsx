import { ingredientItem } from "@/Core/Interfaces/Ingredients/ingredient.types";
import { SizeOption } from "@/Core/Interfaces/Home/PizzaCustomization.Interface";

interface PizzaCanvasProps {
    sizeOption: SizeOption;
    selectedIngredients: ingredientItem[];
    onReset: () => void;
}

// Deterministic radial positions for toppings (radius % from center, angle in degrees)
const TOPPING_COORDINATES = [
    { r: 24, a: 30 },
    { r: 26, a: 150 },
    { r: 25, a: 270 },
    { r: 52, a: 0 },
    { r: 55, a: 60 },
    { r: 53, a: 120 },
    { r: 54, a: 180 },
    { r: 52, a: 240 },
    { r: 55, a: 300 },
];

export default function PizzaCanvas({
    sizeOption,
    selectedIngredients,
    onReset,
}: PizzaCanvasProps) {
    // Render distinct SVG topping element based on ingredient name or color
    const renderToppingElement = (
        ingredient: ingredientItem,
        cx: number,
        cy: number,
        key: string,
        rotation: number
    ) => {
        const lowerName = ingredient.name.toLowerCase();

        if (lowerName.includes("pepperoni")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                    <circle r="15" fill="#B22222" stroke="#781414" strokeWidth="2" />
                    <circle cx="-5" cy="-4" r="1.5" fill="#E57373" opacity="0.6" />
                    <circle cx="4" cy="5" r="1.5" fill="#6A0C0C" opacity="0.7" />
                    <circle cx="5" cy="-3" r="1" fill="#FFCDD2" opacity="0.5" />
                </g>
            );
        }

        if (lowerName.includes("sausage")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                    <path
                        d="M-8,-6 Q0,-10 8,-5 Q12,2 6,8 Q-2,10 -8,4 Z"
                        fill="#795548"
                        stroke="#4E342E"
                        strokeWidth="1.5"
                    />
                    <circle cx="1" cy="0" r="1.5" fill="#3E2723" />
                </g>
            );
        }

        if (lowerName.includes("mushroom")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                    <path
                        d="M-12,0 C-12,-11 12,-11 12,0 Z"
                        fill="#A1887F"
                        stroke="#4E342E"
                        strokeWidth="1.5"
                    />
                    <rect
                        x="-3"
                        y="0"
                        width="6"
                        height="9"
                        rx="2"
                        fill="#D7CCC8"
                        stroke="#4E342E"
                        strokeWidth="1.5"
                    />
                    <path d="M-8, -2 Q0, -7 8, -2" stroke="#5D4037" strokeWidth="1" fill="none" />
                </g>
            );
        }

        if (lowerName.includes("olive")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy})`}>
                    <circle r="9" fill="#1A1A1A" stroke="#000000" strokeWidth="1.5" />
                    <circle r="4" fill="#FDD835" />
                </g>
            );
        }

        if (lowerName.includes("basil")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                    <path
                        d="M0,-14 C9,-8 9,8 0,14 C-9,8 -9,-8 0,-14 Z"
                        fill="#2E7D32"
                        stroke="#1B5E20"
                        strokeWidth="1.5"
                    />
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="#81C784" strokeWidth="1" />
                </g>
            );
        }

        if (lowerName.includes("cheese") || lowerName.includes("mozzarella")) {
            return (
                <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                    <path
                        d="M-12,-4 Q-4,-9 6,-4 Q12,2 4,6 Q-6,8 -12,-4 Z"
                        fill="#FFA000"
                        opacity="0.85"
                    />
                </g>
            );
        }

        // Generic topping with ingredient's configured colorHex
        const hex = ingredient.colorHex || "#D84315";
        return (
            <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
                <circle r="11" fill={hex} stroke="#1A1A1A" strokeWidth="1.5" />
                <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" opacity="0.4" />
            </g>
        );
    };

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden">
            {/* Top Bar inside Canvas Card */}
            <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="font-black text-black-font text-lg tracking-wide">
                        Pizza Canvas
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-beige-color border border-black-font font-bold text-black-font">
                        {sizeOption.inches}&quot; {sizeOption.size}
                    </span>
                </div>
                {selectedIngredients.length > 0 && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-xs font-bold text-sub-color hover:text-red-color underline cursor-pointer transition-colors"
                    >
                        Clear Toppings
                    </button>
                )}
            </div>

            {/* Pizza Interactive Graphic Container */}
            <div className="w-full h-80 sm:h-96 flex items-center justify-center relative my-2">
                <div
                    className="relative transition-transform duration-300 ease-out select-none"
                    style={{
                        transform: `scale(${sizeOption.scale})`,
                        width: "320px",
                        height: "320px",
                    }}
                >
                    <svg
                        viewBox="0 0 320 320"
                        className="w-full h-full drop-shadow-md"
                        style={{ overflow: "visible" }}
                    >
                        <defs>
                            {/* Crust Gradient */}
                            <radialGradient id="crustGradient" cx="50%" cy="50%" r="50%">
                                <stop offset="85%" stopColor="#DE9B52" />
                                <stop offset="96%" stopColor="#C98138" />
                                <stop offset="100%" stopColor="#9B591E" />
                            </radialGradient>

                            {/* Sauce Gradient */}
                            <radialGradient id="sauceGradient" cx="48%" cy="48%" r="50%">
                                <stop offset="0%" stopColor="#D32F2F" />
                                <stop offset="85%" stopColor="#B71C1C" />
                                <stop offset="100%" stopColor="#8E0000" />
                            </radialGradient>

                            {/* Cheese Gradient */}
                            <radialGradient id="cheeseGradient" cx="45%" cy="45%" r="50%">
                                <stop offset="0%" stopColor="#FFF9C4" />
                                <stop offset="35%" stopColor="#FFF176" />
                                <stop offset="80%" stopColor="#FDD835" />
                                <stop offset="95%" stopColor="#FBC02D" />
                                <stop offset="100%" stopColor="#E65100" />
                            </radialGradient>
                        </defs>

                        {/* Outer Crust */}
                        <circle
                            cx="160"
                            cy="160"
                            r="152"
                            fill="url(#crustGradient)"
                            stroke="#1A1A1A"
                            strokeWidth="4"
                        />

                        {/* Subtle Crust Blisters/Texture */}
                        <circle cx="50" cy="110" r="4" fill="#794615" opacity="0.4" />
                        <circle cx="270" cy="190" r="5" fill="#794615" opacity="0.4" />
                        <circle cx="210" cy="285" r="3.5" fill="#794615" opacity="0.4" />
                        <circle cx="110" cy="35" r="4.5" fill="#794615" opacity="0.4" />

                        {/* Tomato Sauce Base */}
                        <circle
                            cx="160"
                            cy="160"
                            r="128"
                            fill="url(#sauceGradient)"
                            stroke="#8E0000"
                            strokeWidth="2"
                        />

                        {/* Melted Cheese Layer */}
                        <circle
                            cx="160"
                            cy="160"
                            r="122"
                            fill="url(#cheeseGradient)"
                            stroke="#D7A416"
                            strokeWidth="1.5"
                        />

                        {/* Baked Cheese Highlights */}
                        <ellipse cx="140" cy="130" rx="15" ry="8" fill="#F57C00" opacity="0.25" />
                        <ellipse cx="190" cy="180" rx="20" ry="10" fill="#F57C00" opacity="0.22" />
                        <ellipse cx="125" cy="205" rx="14" ry="7" fill="#F57C00" opacity="0.2" />

                        {/* Dynamic Toppings Layer */}
                        {selectedIngredients.map((ingredient, ingIndex) => {
                            // Stagger starting angle per ingredient so toppings don't stack directly
                            const angleOffset = (ingIndex * 37) % 360;

                            return (
                                <g key={ingredient.id} className="transition-opacity duration-200">
                                    {TOPPING_COORDINATES.map((coord, coordIndex) => {
                                        const angleRad = ((coord.a + angleOffset) * Math.PI) / 180;
                                        const x = 160 + coord.r * Math.cos(angleRad);
                                        const y = 160 + coord.r * Math.sin(angleRad);
                                        const rotation = (coord.a + angleOffset * 2) % 360;

                                        return renderToppingElement(
                                            ingredient,
                                            x,
                                            y,
                                            `${ingredient.id}-${coordIndex}`,
                                            rotation
                                        );
                                    })}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Bottom Topping Count Pill */}
            <div className="w-full flex items-center justify-center pt-2">
                <span className="text-xs font-bold text-sub-color uppercase tracking-wider">
                    {selectedIngredients.length === 0
                        ? "Plain Cheese & Sauce (Click ingredients to add toppings)"
                        : `${selectedIngredients.length} topping${
                              selectedIngredients.length > 1 ? "s" : ""
                          } on pizza`}
                </span>
            </div>
        </div>
    );
}
