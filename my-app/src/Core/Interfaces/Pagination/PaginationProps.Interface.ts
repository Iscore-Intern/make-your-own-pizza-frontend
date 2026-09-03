export default interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    gotoNextPage: () => void;
    gotoPrevPage: () => void;
}