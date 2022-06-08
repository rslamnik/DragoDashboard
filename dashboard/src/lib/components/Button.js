import React from "react";
import PropTypes from "prop-types";

import { Button as BootstrapButton, Spinner } from "react-bootstrap";
import styled from "styled-components";

const Container = styled(BootstrapButton)`
  font-size: 14px;
  line-height: 1.57;
  box-shadow: 0px 1px 1px 0 rgba(19, 31, 21, 0.1);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 38px;
  cursor: pointer;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const Loader = styled(Spinner)`
  margin-right: 10px;
`;

export const Button = ({
    variant = "primary",
    loading,
    disabled,
    children,
    ...rest
}) => (
    <Container variant={variant} disabled={loading || disabled} {...rest}>
        {loading && <Loader animation="border" size="sm" />}
        {children}
    </Container>
);

Button.propTypes = {
    variant: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
};
