import React from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import styled from "styled-components";

import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

const Container = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

const InputComponent = styled(FormControl)`
  width: 100%;
  height: 38px;
  font-size: 14px;
`;

export const Input = ({
  label = "",
  validationMessage,
  type = "text",
  ...rest
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputComponent type={type} {...rest} />
      {validationMessage && <ErrorMessage message={validationMessage} />}
    </Container>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  validationMessage: PropTypes.string,
};
