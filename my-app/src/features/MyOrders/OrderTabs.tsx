
import { orderTabsProps } from "./Order";

export default function OrderTabs({ isActive, onTabChange }: orderTabsProps) {
    return (
        <div className="flex bg-white-color p-1.5 rounded-xl w-fit gap-2">
            <button
                type="button"
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isActive 
                        ? 'bg-red-color text-white-color shadow-md' 
                        : 'text-gray-600 hover:text-black-font'
                }`}
                onClick={() => onTabChange(true)}
            >
                Active Orders
            </button>
            <button 
                type="button"
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    !isActive 
                        ? 'bg-red-color text-white-color shadow-md' 
                        : 'text-gray-600 hover:text-black-font'
                }`}
                onClick={() => onTabChange(false)}
            >
                Past Orders
            </button>
        </div>
    );
}