import React from "react";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled(Pagination.Item)`
  padding: 2px 0px;
  cursor: pointer;
`;

export const PaginationItem = ({ onClick, children, ...rest }) => {
    return (
        <Wrapper {...rest} onClick={onClick}>
            {children}
        </Wrapper>
    );
};

PaginationItem.propTypes = {
    onClick: PropTypes.func,
};
