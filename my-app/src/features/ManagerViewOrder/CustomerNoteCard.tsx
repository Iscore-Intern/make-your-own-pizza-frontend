interface CustomerNoteCardProps {
    note?: string;
}

export default function CustomerNoteCard({ note }: CustomerNoteCardProps) {
    if (!note || note.trim() === "") return null;

    return (
        <div className="w-full bg-white-color rounded-3xl border-black-font border-t-2 border-l-2 border-r-6 border-b-6 p-6">
            <span className="text-xs font-bold text-sub-color uppercase tracking-widest block">
                CUSTOMER NOTE
            </span>
            <div className="flex items-center gap-2 mt-2 text-black-font font-medium text-base">
                <span role="img" aria-label="note" className="text-lg select-none">
                    💬
                </span>
                <span>{note}</span>
            </div>
        </div>
    );
}
