import React from "react";
import styled from "styled-components";

import { Label } from "lib/components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Value = styled.p`
  font-size: 14px;
`;

export const Readonly = ({ label, value }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Container>
    );
};