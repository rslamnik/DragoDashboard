import { React } from "react";
import styled from "styled-components";

const StatusIcon = styled.span`
  height: 25px;
  width: 25px;
  background-color: ${({ color }) => color} !important;
  border-radius: 50%;
  display: inline-block;
`;

export const Status = ({ active }) => {
    return <StatusIcon color={active ? "green" : "red"} />;
}