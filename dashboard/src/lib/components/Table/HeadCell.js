import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import styled, { css } from "styled-components";

import { SORT_ORDER } from "./Table";
import { Cell } from "./Cell";

const IconWrapper = styled.div`
  position: relative;
  display: inline;
  margin-left: 5px;
`;

const Icon = css`
  cursor: pointer;
  position: absolute;
  top: -8px;
  left: 0;
`;

const SortIconUp = styled(FaSortUp)`
  opacity: ${({ order }) =>
        order === SORT_ORDER.ASC || order === null ? "0.3" : "1"};
  ${Icon}
`;

const SortIconDown = styled(FaSortDown)`
  opacity: ${({ order }) =>
        order === SORT_ORDER.DESC || order === null ? "0.3" : "1"};
  ${Icon}
`;

const Wrapper = styled.th`
  ${Cell};
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  border-bottom: 1px solid #eaedf3 !important;
  text-transform: uppercase;
  border: 0px !important;
  font-size: 12px !important;
`;

export const HeadCell = ({ column, onSort }) => {
    const [sortOrder, setSortOrder] = useState(column.sortOrder);

    const handleSort = () => {
        const order =
            sortOrder === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;
        setSortOrder(order);

        if (onSort) {
            onSort(column.sortBy, order);
        }
    };

    return (
        <Wrapper>
            <div className="d-flex align-items-center">
                {column.name}
                {column.sortable && (
                    <IconWrapper>
                        <SortIconUp order={sortOrder} onClick={handleSort} />
                        <SortIconDown order={sortOrder} onClick={handleSort} />
                    </IconWrapper>
                )}
            </div>
        </Wrapper>
    );
};
