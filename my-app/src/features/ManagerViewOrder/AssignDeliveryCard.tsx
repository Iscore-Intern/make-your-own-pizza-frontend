import Driver from "@/Core/Interfaces/ManagerViewOrder/Driver.Interface";

interface AssignDeliveryCardProps {
    drivers: Driver[] | null;
    isLoadingDrivers: boolean;
    selectedDriverId: string | null;
    isAssigningDriver: boolean;
    onSelectDriver: (driverId: string) => void;
    onAssignDriver: () => void;
}

export default function AssignDeliveryCard({
    drivers,
    isLoadingDrivers,
    selectedDriverId,
    isAssigningDriver,
    onSelectDriver,
    onAssignDriver,
}: AssignDeliveryCardProps) {
    const selectedDriver = drivers?.find((d) => d.driverId === selectedDriverId);

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Assign Delivery 🛵
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
                {isLoadingDrivers && (!drivers || drivers.length === 0) ? (
                    <div className="py-6 text-center text-sub-color font-semibold">
                        Loading drivers...
                    </div>
                ) : (
                    drivers?.map((driver) => {
                        const isAvailable = driver.driverStatus === "Available";
                        const isSelected = selectedDriverId === driver.driverId;

                        return (
                            <div
                                key={driver.driverId}
                                onClick={() => {
                                    if (isAvailable) {
                                        onSelectDriver(isSelected ? "" : driver.driverId);
                                    }
                                }}
                                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                                    isAvailable
                                        ? "cursor-pointer hover:border-black-font"
                                        : "cursor-not-allowed opacity-60"
                                } ${
                                    isSelected
                                        ? "border-red-color bg-red-50/20"
                                        : "border-black-font/30 bg-white-color"
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className={`w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center transition-colors text-base select-none ${
                                            isSelected
                                                ? "bg-red-color text-white font-bold"
                                                : "bg-beige-color text-red-color"
                                        }`}
                                    >
                                        {isSelected ? "✓" : "🛵"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-black-font text-base">
                                            {driver.driverName}
                                        </span>
                                        <span className="text-xs text-sub-color font-semibold">
                                            {driver.driverZone} · {driver.driverPhone}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {isAvailable ? (
                                        <span className="border-2 border-emerald-500 text-emerald-600 bg-emerald-50/40 text-xs font-bold px-4 py-1.5 rounded-full inline-block">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="border-2 border-red-300 text-red-500 bg-red-50/40 text-xs font-bold px-4 py-1.5 rounded-full inline-block">
                                            Busy
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}

                {/* Confirm Assign Button appears when an available driver is selected */}
                {selectedDriver && selectedDriver.driverStatus === "Available" && (
                    <button
                        type="button"
                        onClick={onAssignDriver}
                        disabled={isAssigningDriver}
                        className="w-full mt-3 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-4 hover:border-b-4 active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isAssigningDriver
                            ? "Assigning Driver..."
                            : `Assign ${selectedDriver.driverName}`}
                    </button>
                )}
            </div>
        </div>
    );
}
