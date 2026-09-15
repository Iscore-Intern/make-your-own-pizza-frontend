import Customer from "../../assets/user.png"
interface customerInfoCardProps{
    customerName:string;
    customerPhone:string;
    customerAddress:string;
    placedAt:string;
}

export default function CustomerInfoCard({
    customerName,
    customerPhone,
    customerAddress,
    placedAt,
}: customerInfoCardProps){
    return(
        <div className="w-full bg-white-color rounded-2xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6">
            <div className="px-6 py-4 rounded-2xl border-b-2 border-beige-dark bg-beige-color w-full flex items-center">
                <h2 className="text-xl font-black tracking-widest">Customer </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Name
                    </span>
                    <span className="font-semibold text-black-font">
                        {customerName}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Address
                    </span>
                    <span className="font-semibold text-black-font">
                        {customerAddress}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        Phone
                    </span>
                    <span className="font-semibold text-black-font">
                        {customerPhone}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-sub-color uppercase tracking-widest">
                        placed at
                    </span>
                    <span className="font-semibold text-black-font">
                        {placedAt}
                    </span>
                </div>
            </div>
        </div>
    )
}