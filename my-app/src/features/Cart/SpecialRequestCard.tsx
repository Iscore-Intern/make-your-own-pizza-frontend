interface SpecialRequestCardProps {
    value: string;
    onChange: (text: string) => void;
}

export default function SpecialRequestCard({
    value,
    onChange,
}: SpecialRequestCardProps) {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-black-font">
                    Special Instructions 💬
                </h2>
            </div>
            <div className="p-6">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Have any allergies, extra crispy crust preference, or delivery notes? Let us know!"
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-black-font bg-beige-color text-black-font placeholder-sub-color focus:outline-none focus:border-red-color transition-colors text-sm font-medium resize-y"
                />
            </div>
        </div>
    );
}
