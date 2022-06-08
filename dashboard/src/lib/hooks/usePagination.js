import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    return { page, setPage, count, setCount, maxPages, setMaxPages };
};