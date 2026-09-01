import ToggleTabsProps from "./ToggleTabsProps.Interface";




export default function ToggleTabs<T>({ options, activeValue, onChange }: ToggleTabsProps<T>) {
    return (
        <div className="flex bg-white-color p-1.5 rounded-xl w-fit gap-2">
            {options.map((option, index) => (
                <button
                    key={index}
                    type="button"
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                        activeValue === option.value
                            ? 'bg-red-color text-white-color shadow-md'
                            : 'text-gray-600 hover:text-black-font'
                    }`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}