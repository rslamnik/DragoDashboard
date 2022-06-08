import { Row as BootstrapRow } from "react-bootstrap";
import styled from "styled-components";

export const Row = styled(BootstrapRow)`
  margin-bottom: 20px;

  > div:not(:first-child) {
    margin-left: 10px;
  }
`;
