import { orderTabsProps } from "./orders";

export default function OrderTabs({ isActive, onTabChange }: orderTabsProps) {
    return (
        <div className="flex rounded-full p-1 w-fit" style={{ backgroundColor: "white" }}>
            <button 
                className={`px-6 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
                onClick={() => onTabChange(true)}
            >
                Active Orders
            </button>
            <button 
                className={`px-6 py-2 rounded-full transition-all duration-300 ${!isActive ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
                onClick={() => onTabChange(false)}
            >
                Past Orders
            </button>
        </div>
    );
}