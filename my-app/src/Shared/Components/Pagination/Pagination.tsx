import PaginationProps from "@/Core/Interfaces/Pagination/PaginationProps.Interface";

export default function Pagination({
    currentPage,
    pageSize,
    totalCount,
    gotoNextPage,
    gotoPrevPage
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const buttonStyle = `
        px-5 py-2.5 rounded-xl font-bold text-sm
        bg-red-color text-white-color
        border-2 border-black-font border-r-4 border-b-4
        hover:translate-x-0.5 hover:translate-y-0.5 hover:border-r-2 hover:border-b-2
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:border-r-4 disabled:border-b-4
    `;

    return (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button
                type="button"
                onClick={gotoPrevPage}
                disabled={isFirstPage}
                className={buttonStyle}
            >
                Previous
            </button>
            <span className="font-bold text-black-font text-sm bg-beige-color px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs select-none pointer-events-none cursor-default">
                Page {currentPage} of {totalPages}
            </span>
            <button
                type="button"
                onClick={gotoNextPage}
                disabled={isLastPage}
                className={buttonStyle}
            >
                Next
            </button>
        </div>
    );
}