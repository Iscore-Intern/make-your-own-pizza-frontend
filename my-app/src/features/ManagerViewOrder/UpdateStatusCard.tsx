import ManagerViewOrder from "@/Core/Interfaces/ManagerViewOrder/ManagerViewOrder.Interface";

interface UpdateStatusCardProps {
    statuses: ManagerViewOrder["status"][];
    selectedStatus: ManagerViewOrder["status"] | "";
    currentStatus?: ManagerViewOrder["status"];
    isSaving: boolean;
    onSelectStatus: (status: ManagerViewOrder["status"]) => void;
    onSaveChanges: () => void;
}

export default function UpdateStatusCard({
    statuses,
    selectedStatus,
    currentStatus,
    isSaving,
    onSelectStatus,
    onSaveChanges,
}: UpdateStatusCardProps) {
    const isUnchanged = selectedStatus === currentStatus;

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-beige-dark bg-beige-color w-full flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide text-black-font">
                    Update Status 🔄
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                    {statuses.map((status) => {
                        const isSelected = selectedStatus === status;

                        return (
                            <button
                                key={status}
                                type="button"
                                onClick={() => onSelectStatus(status)}
                                className={`px-5 py-2.5 rounded-full text-sm transition-all cursor-pointer ${
                                    isSelected
                                        ? "border-2 border-red-color text-red-color font-bold bg-white shadow-xs"
                                        : "border border-gray-300 text-gray-600 hover:border-gray-400 font-semibold bg-white"
                                }`}
                            >
                                {status}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={onSaveChanges}
                    disabled={isSaving || isUnchanged}
                    className="w-full py-4 rounded-2xl bg-red-color text-white-color font-bold text-lg border-2 border-black-font border-r-6 border-b-6 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-4 hover:border-b-4 active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isSaving ? "Saving Changes..." : "Save Changes 🔥"}
                </button>
            </div>
        </div>
    );
}
