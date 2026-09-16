import { CustomerContact } from "@/Core/Interfaces/Cart/CheckoutPayload.Interface";
import AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";

interface DeliveryAddressCardProps {
    contact: CustomerContact;
    address: AddressValues;
    formattedAddress: string;
    isEditing: boolean;
    onToggleEdit: (editing: boolean) => void;
    onUpdateContact: (field: keyof CustomerContact, value: string) => void;
    onUpdateAddress: (field: keyof AddressValues, value: string) => void;
}

export default function DeliveryAddressCard({
    contact,
    address,
    formattedAddress,
    isEditing,
    onToggleEdit,
    onUpdateContact,
    onUpdateAddress,
}: DeliveryAddressCardProps) {
    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center justify-between">
                <h2 className="text-lg font-black tracking-wide text-black-font flex items-center gap-2">
                    <span>Delivery Details</span>
                    <span>📍</span>
                </h2>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => onToggleEdit(true)}
                        className="px-3.5 py-1.5 rounded-xl border-2 border-black-font text-xs font-black bg-white-color hover:bg-beige-color text-black-font transition-all cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="p-6">
                {!isEditing ? (
                    /* Display Mode */
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b-2 border-beige-dark">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold text-sub-color uppercase tracking-wider">
                                    Recipient
                                </span>
                                <span className="font-bold text-black-font text-base">
                                    {contact.name || "Karim Ahmed"}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold text-sub-color uppercase tracking-wider">
                                    Phone Number
                                </span>
                                <span className="font-bold text-black-font text-base">
                                    {contact.phone || "+20 100 123 4567"}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-sub-color uppercase tracking-wider">
                                Drop-off Address
                            </span>
                            <span className="font-bold text-black-font text-sm leading-relaxed">
                                {formattedAddress}
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Edit Form Mode */
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-black text-black-font uppercase">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={contact.name}
                                    onChange={(e) => onUpdateContact("name", e.target.value)}
                                    placeholder="Karim Ahmed"
                                    className="px-3.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-black text-black-font uppercase">
                                    Phone Number *
                                </label>
                                <input
                                    type="text"
                                    value={contact.phone}
                                    onChange={(e) => onUpdateContact("phone", e.target.value)}
                                    placeholder="+20 100 123 4567"
                                    className="px-3.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-black text-black-font uppercase">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    value={address.city}
                                    onChange={(e) => onUpdateAddress("city", e.target.value)}
                                    placeholder="Cairo"
                                    className="px-3.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-black text-black-font uppercase">
                                    District / Area
                                </label>
                                <input
                                    type="text"
                                    value={address.district}
                                    onChange={(e) => onUpdateAddress("district", e.target.value)}
                                    placeholder="Downtown / Maadi"
                                    className="px-3.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-black text-black-font uppercase">
                                Street Name *
                            </label>
                            <input
                                type="text"
                                value={address.street}
                                onChange={(e) => onUpdateAddress("street", e.target.value)}
                                placeholder="Tahrir St"
                                className="px-3.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold focus:outline-none focus:border-red-color transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2.5">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-black text-black-font uppercase">
                                    Bldg No
                                </label>
                                <input
                                    type="text"
                                    value={address.building_no}
                                    onChange={(e) => onUpdateAddress("building_no", e.target.value)}
                                    placeholder="12"
                                    className="px-2.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold text-center focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-black text-black-font uppercase">
                                    Floor No
                                </label>
                                <input
                                    type="text"
                                    value={address.floor_no}
                                    onChange={(e) => onUpdateAddress("floor_no", e.target.value)}
                                    placeholder="3"
                                    className="px-2.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold text-center focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-black text-black-font uppercase">
                                    Apt No
                                </label>
                                <input
                                    type="text"
                                    value={address.apt_no}
                                    onChange={(e) => onUpdateAddress("apt_no", e.target.value)}
                                    placeholder="15"
                                    className="px-2.5 py-2.5 rounded-xl border-2 border-black-font bg-beige-color text-black-font text-sm font-semibold text-center focus:outline-none focus:border-red-color transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => onToggleEdit(false)}
                                className="px-5 py-2 rounded-xl bg-red-color text-white-color text-xs font-black border-2 border-black-font border-r-4 border-b-4 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
