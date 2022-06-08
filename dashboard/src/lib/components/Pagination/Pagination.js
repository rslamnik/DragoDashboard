import React, { useMemo } from "react";
import { Pagination as ReactstrapPagination } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import styled, { css } from "styled-components";

import { PaginationItem } from "./PaginationItem";
import { DEFAULT_PAGE_SIZE } from "lib/components";

const DISPLAYED_PAGES = 5;

const Icon = css`
  opacity: 70%;
`;

const CaretLeft = styled(FaCaretLeft)`
  ${Icon}
`;

const CaretRight = styled(FaCaretRight)`
  ${Icon}
`;

const Page = styled(PaginationItem)`
  && a {
    border-left: 0px;
  }
`;

export const Pagination = ({ count, page, maxPages, onPageChange }) => {
    /**
     * Used for generating pages that will be displayed.
     */
    const pages = useMemo(() => {
        const result = [];
        const limit = page + DISPLAYED_PAGES;
        let upperLimit = limit > maxPages ? maxPages : limit;

        if (upperLimit - page === DISPLAYED_PAGES) {
            upperLimit--;
        }

        for (let i = page; i <= upperLimit; i++) {
            result.push(i);
        }

        while (result.length < DISPLAYED_PAGES && result[0] - 1 > 0) {
            result.unshift(result[0] - 1);
        }

        return result;
    }, [maxPages, page]);

    return (
        <>
            {maxPages > 1 && count > DEFAULT_PAGE_SIZE && (
                <ReactstrapPagination>
                    <PaginationItem
                        onClick={() => {
                            onPageChange(page - 1);
                        }}
                        disabled={page === 1}
                    >
                        <CaretLeft />
                    </PaginationItem>

                    {pages.map((p, i) => (
                        <Page
                            onClick={() => {
                                onPageChange(p);
                            }}
                            key={i}
                            active={p === page}
                        >
                            {p}
                        </Page>
                    ))}

                    <PaginationItem
                        onClick={() => {
                            onPageChange(page + 1);
                        }}
                        disabled={page === maxPages}
                    >
                        <CaretRight />
                    </PaginationItem>
                </ReactstrapPagination>
            )}
        </>
    );
};

Pagination.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    maxPages: PropTypes.number,
    onPageChange: PropTypes.func,
};
