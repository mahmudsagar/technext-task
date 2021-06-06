import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

const PostPaginationComponent = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange,
}) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const pageinationItems = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li
                    className={`page-item ${
                       localStorage.getItem("currentPostPage")
                            ? parseInt(localStorage.getItem("currentPostPage")) ===
                                  i && "active"
                            : currentPage === i && "active"
                    }`}
                    key={i}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </li>
            );
        }
        return pages;
    }, [totalPages, currentPage, onPageChange]);

    if (totalPages === 0) return null;

    return (
        <ul className="pagination mb-0">
            <li
                className="page-item disabled"
                onClick={() =>
                    onPageChange(
                        currentPage === 1
                            ? (currentPage = totalPages)
                            : currentPage - 1
                    )
                }
            >
                Previous
            </li>
            {pageinationItems}
            <li
                className="page-item"
                onClick={() => {
                    onPageChange(
                        currentPage === totalPages
                            ? (currentPage = 1)
                            : currentPage + 1
                    );
                }}
            >
                Next
            </li>
        </ul>
    );
};

export default PostPaginationComponent;