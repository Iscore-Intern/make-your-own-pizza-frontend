import PaginationProps from "@/Core/Interfaces/Pagination/PaginationProps.Interface";



export default function Pagination({currentPage, pageSize, totalCount, gotoNextPage, gotoPrevPage}: PaginationProps) {

    const  totalPages = Math.max(1, Math.ceil(totalCount / pageSize));


    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <div className= "Pagination-container flex justify-center items-center gap-4 mt-4">
            <button type = "button" onClick={gotoPrevPage} disabled={isFirstPage}>
                Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button type = "button" onClick={gotoNextPage} disabled={isLastPage}>
                Next
            </button>
        </div>
    )
}