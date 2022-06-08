import React from "react";
import styled from "styled-components";

export const Label = ({ children, ...rest }) => (
    <Wrapper {...rest}>{children}</Wrapper>
);

const Wrapper = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--secondary);
  letter-spacing: normal;
  text-transform: uppercase;
`;
