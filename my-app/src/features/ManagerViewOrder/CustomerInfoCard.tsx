interface CustomerInfoCardProps {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    placedAt: string;
}

export default function CustomerInfoCard({
    customerName,
    customerPhone,
    customerAddress,
    placedAt,
}: CustomerInfoCardProps) {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Customer 👤
                </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {/* Row 1 Left: Name */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Name
                    </span>
                    <span className="font-bold text-black-font text-base">
                        {customerName}
                    </span>
                </div>
                {/* Row 1 Right: Phone */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Phone
                    </span>
                    <span className="font-bold text-black-font text-base">
                        {customerPhone}
                    </span>
                </div>
                {/* Row 2 Left: Address */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Address
                    </span>
                    <span className="font-bold text-black-font text-base">
                        {customerAddress}
                    </span>
                </div>
                {/* Row 2 Right: Placed */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Placed
                    </span>
                    <span className="font-bold text-black-font text-base">
                        {placedAt}
                    </span>
                </div>
            </div>
        </div>
    );
}